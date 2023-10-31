import {consulta} from "../database/conexao.js";

class QrcodeRepository {

    create(nome_req, matricula_req) {
        const sql_inserir_participante = "INSERT INTO participante (nome_participante,matricula, curso, campus, email, registro_entrada) VALUES ($1,$2,$3,$4,$5,$6)"
        return consulta(sql_inserir_participante,[nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao], 'Não foi possivel cadastrar')
    }

    // Procurando Usuario
    findById(nome_req, matricula_req) {
        const sql2 = "SELECT * FROM participante WHERE nome_participante='Joao' and matricula = '1'" 
        const sql = "SELECT * FROM participante WHERE nome_participante=$1 and matricula =$2" 
        return consulta(sql,[nome_req, matricula_req], 'Não foi possivel Localizar')
    }

}


export default new QrcodeRepository()