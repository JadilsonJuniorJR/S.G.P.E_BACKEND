// Importando requisições
import converterJSON from 'json2csv'

// Importando Classes
import EventoRepository from "../repositories/EventoRepository.js";
import ParticipanteRepository from "../repositories/ParticipanteRepository.js";


class ListarEvento {

    async evento(req, res) {
        const id_req = req.body.dados.id_evento
        const opc_req = req.body.dados.radio
        console.log(id_req)
        console.log(opc_req)
        try {
            const resposta = await EventoRepository.findById(id_req,opc_req)
            console.log(resposta)
            
            const json2csvParser = new converterJSON.Parser();
            const csv = json2csvParser.parse(resposta);
            res.setHeader('Content-Type', 'text/csv');
            res.send(csv)
            res.status(200)
        } catch (error) {
            res.status(400)
            res.status(404).json({ 'ERRO': 'TABELA INEXISTENTE' })
        }
    }

    async participante(req, res) {
        const id_req = req.body.dados.id_evento;
        const opc_req = req.body.dados.radio
        try {
            // Realizando a Requisição dos Dados
            // const resposta = await ParticipanteRepository.findAll(req, res)
            const resposta = await EventoRepository.findById(id_req,opc_req)
            console.log(resposta)
            // Criando o objeto de Coversão e convertendo os JSON em CSV
            const json2csvParser = new converterJSON.Parser();
            const csv = json2csvParser.parse(resposta);
            res.setHeader('Content-Type', 'text/csv');
            res.send(csv)
            res.status(200)
        } catch (error) {
            res.status(404).json(error)
        }
    }
}

export default new ListarEvento()