import ParticipanteRepository from "../repositories/ParticipanteRepository.js";
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
        const curso_req = req.body.dados.curso;
        const campus_req = req.body.dados.campus;
        const email_req = req.body.dados.email;
        const dataHoraRequisicao = new Date().toLocaleString('pt-BR', {day: '2-digit',month: 'numeric',year: 'numeric',hour: '2-digit',minute: '2-digit'})

        // console.log(dataHoraRequisicao)
        const resultado_criacao = await ParticipanteRepository.create(nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao)
        res.json(resultado_criacao)

    }

    // Atualizar Dado do Usuario 
    async update(req, res) {
        const dataHoraRequisicao = new Date().toLocaleString('pt-BR', {day: '2-digit',month: 'numeric',year: 'numeric',hour: '2-digit',minute: '2-digit'})
        const nome_req = req.params.nome_user.toLowerCase();
        const matricula_req = req.params.matricula;

        const resposta_consulta = await ParticipanteRepository.findById(nome_req, matricula_req)
        // console.log(resposta_consulta.rowCount)
        
        if (resposta_consulta.rowCount == 0) {
            res.status(404).json({ Erro: 'Participante não registrado no sistema!' })
        } else {
            const resultado_alteracao = await ParticipanteRepository.update(nome_req, matricula_req, dataHoraRequisicao)
            res.json(resultado_alteracao)
        }
    }

}

// Padrao Singleton
export default new ParticipanteController()