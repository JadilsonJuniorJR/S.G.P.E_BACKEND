import SelecaoRepository from "../repositories/SelecaoRepository.js";

// Classe Responsavel por Chama os Metodos do CRUD 
// Responsavel pelas respostas para os usuarios 
class SelecaoController {



    // Listar Tudo. Obs: é um metodo assicrono que esta aguardando o resultado do metodo SelecaoRepository.findAll()
    async index(req, res) {
        // Armazena o resultado da execução do metodo 
        const resultado_busca = await SelecaoRepository.findAll()
        res.json(resultado_busca)
    }

    // Seleciona Tudo Por ID
    show(){

    }

    // Criar Evento
    async store(req, res) {
        // console.log(req.body)
        const nome_req = req.body.evento.nome_evento;
        const data_inicio = req.body.evento.data_inicio;
        const hora_inicio = req.body.evento.hora_inicio;
        const data_termino = req.body.evento.data_termino;
        const hora_termino = req.body.evento.hora_termino;
        const tolerancia = req.body.evento.tolerancia;
        const descricao_req = req.body.evento.descricao;
        
        // console.log(req.body)

        const resultado_criacao = await SelecaoRepository.create( nome_req, data_inicio, hora_inicio, data_termino, hora_termino, tolerancia, descricao_req)
        res.json(resultado_criacao)
        // const {nome_req,data_inicio,hora_inicio,data_termino,hora_termino,descricao_req} = req.body.evento
        // console.log(descricao_req)
        
    }

    // Atualiza Dados
    update(){

    }

}

// Padrao Singleton
export default new SelecaoController()