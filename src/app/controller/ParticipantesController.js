// import moment from "moment";
import moment from "moment-timezone";
import ParticipanteRepository from "../repositories/ParticipanteRepository.js";
import VerificarPresenca from "../services/VerificarPresenca.js";
import EventoRepository from "../repositories/EventoRepository.js";
// Classe Responsavel por Chama os Metodos do CRUD 
// Responsavel pelas respostas para os usuarios 
class ParticipanteController {

    // Verificar se existe participante
    async show(req, res) {
        const nome_req = req.params.nome_user;
        const matricula_req = req.params.matricula;

        const resposta_consulta = await ParticipanteRepository.findById(nome_req, matricula_req)
        if (resposta_consulta.rowCount == 0) {
            res.status(404).json({ Erro: 'Participante não localizado no sistema!' })
        } else {
            // console.log(resposta_consulta.rowCount)
            // console.log(resposta_consulta.rows)
            res.json(resposta_consulta.rowCount)
        }

    }

    // Cadastrar Participante
    async store(req, res) {
        // console.log(req.body)
        const nome_req = req.body.dados.nome_user;
        const matricula_req = req.body.dados.matricula;
        let id_evento_req = req.body.dados.id_evento;
        console.log(id_evento_req.length)
        const curso_req = req.body.dados.curso;
        const campus_req = req.body.dados.campus;
        const email_req = req.body.dados.email;
        // const dataHoraRequisicao = new Date().toLocaleString('pt-BR', { day: '2-digit', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        const dataHoraRequisicao = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm')
        console.log("DATA E HORA DO REGISTRO ENTRADA")
        console.log(dataHoraRequisicao)
        if (id_evento_req.length > 5) {
            const resposta_consulta = await EventoRepository.findById(id_evento_req, '5')
            if (resposta_consulta.rowCount == 0) {
                res.status(404).json({ Erro: 'Evento não localizado no sistema!' })
            } else {
                console.log(resposta_consulta[0].id_evento)
                id_evento_req = resposta_consulta[0].id_evento
                console.log(id_evento_req)
            }
        }

        try {
            const resultado_criacao = await ParticipanteRepository.create(nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao, id_evento_req)
            res.json(resultado_criacao)
        } catch (error) {
            res.status(400)
            console.log("ERRO")
        }

    }

    // Atualizar Dado do Usuario 
    async update(req, res) {

        let dataHoraRequisicao = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm')
        // const dataHoraRequisicao = new Date().toLocaleString('pt-BR', { day: '2-digit', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        const nome_req = req.params.nome;
        const matricula_req = req.params.matricula;
        console.log(dataHoraRequisicao)
        let resposta_consulta = await ParticipanteRepository.findById(nome_req, matricula_req)
        let validar_participacao = false
        console.log("Resposta Consulta")
        console.log(resposta_consulta[0])

        // console.log("Resposta Consulta Linhas")
        // console.log(resposta_consulta.length)


        // console.log(resposta_consulta.rowCount)
        // Verifica se na pesquisa Realizada, se Há algum retorno, indicando que a um usuaria cadastrado.
        if (resposta_consulta.length == 0) {
            res.status(404).json({ Erro: 'Participante não registrado no sistema!' })

            // VERIFICA SE ALGUM CAMPO DE PARTICIPAÇÃO JÁ FOI UTILIZADO CASO SIM O USUARIO JÁ REALIZOU O CADASTRO
        } else if (resposta_consulta[0].participacao == true || resposta_consulta[0].participacao == false) {
            console.log("USUARIO JÁ CADASTRADO")
            res.status(409).send("USUARIO JÁ CADASTRADO")
        } else {
            // CASO O USUARIO AINDA NÃO CONFIRMOU A PRESENÇA É REALIZADO UMA ATUALIZAÇÃO NA DATA, HORA DE SAIDA E CAMPO PARTICIPAÇÃO
            // TAMBÉM É VERIFICADO A VALIDAÇÃO DE PRESENCIA
            validar_participacao = false
            await ParticipanteRepository.update(nome_req, matricula_req, dataHoraRequisicao, validar_participacao)
            let nova_resposta_consulta = await ParticipanteRepository.findById(nome_req, matricula_req)
            await VerificarPresenca.verificar(nova_resposta_consulta)
            res.status(200).send("USUARIO CADASTRADO NO SISTEMA") 
        }
    }

}

// Padrao Singleton
export default new ParticipanteController()