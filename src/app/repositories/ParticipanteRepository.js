import conexao from "../database/conexao.js";

class ParticipanteRepository {

    // CRUD
    // Adicionar um nova participante
    create(nome_req, matricula_req, curso_req,campus_req, email_req, dataHoraRequisicao) {
        const sql_inserir_participante = "INSERT INTO participante (nome_participante,matricula, curso, campus, email, registro_entrada) VALUES ($1,$2,$3,$4,$5,$6)"

        // Realizando uma consulta ASSINCRONA
        return new Promise((resolve, reject) => {
            // Realizando consulta no DB 
            conexao.query(
                sql_inserir_participante,
                [nome_req, matricula_req, curso_req, campus_req, email_req,dataHoraRequisicao],
                (erro, resultado) => {
                    if (erro) {
                        return reject('Não foi possivel cadastrar !')
                    } else {
                        // Transformando o resultado da Busca em um JSON 
                        const consulta_JSON = JSON.parse(JSON.stringify(resultado.rows))
                        console.log(consulta_JSON)
                        return resolve(consulta_JSON)
                    }
                })
        })
    }

}


export default new ParticipanteRepository()