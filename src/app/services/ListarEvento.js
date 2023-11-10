// Importando requisições
import converterJSON from 'json2csv'

// Importando Classes
import EventoRepository from "../repositories/EventoRepository.js";
import ParticipanteRepository from "../repositories/ParticipanteRepository.js";


class ListarEvento {

    async evento(req, res) {
        try {
            const resposta = await EventoRepository.findAll(req, res)
            const json2csvParser = new converterJSON.Parser();
            const csv = json2csvParser.parse(resposta);
            res.setHeader('Content-Type', 'text/csv');
            res.send(csv)
            res.status(200)
            console.log("CSV CRIADO")
        } catch (error) {
            res.status(400)
            res.status(404).json({ 'ERRO': 'TABELA INEXISTENTE' })
            console.log("ERRO DE CONSULTA")
        }
    }

    async participante(req, res) {
        try {
            const resposta = await ParticipanteRepository.findAll(req, res)
            const json2csvParser = new converterJSON.Parser();
            const csv = json2csvParser.parse(resposta);
            res.setHeader('Content-Type', 'text/csv');
            res.send(csv)
            res.status(200)
            console.log("CSV CRIADO")
        } catch (error) {
            res.status(400)
            res.status(404).json({ 'ERRO': 'TABELA INEXISTENTE' })
            console.log("ERRO DE CONSULTA")
        }
    }
}

export default new ListarEvento()