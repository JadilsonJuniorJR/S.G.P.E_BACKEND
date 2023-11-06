import EventoRepository from "../repositories/EventoRepository.js";
import converterJSON from 'json2csv'
class ArquivarEvento {

    async arquivar (req,res){
        const resposta= await EventoRepository.findAll(req,res)
        const json2csvParser = new converterJSON.Parser();
        const csv = json2csvParser.parse(resposta);
        console.log(csv)
        console.log( resposta)
        res.json(resposta)
    }

}

export default new ArquivarEvento()