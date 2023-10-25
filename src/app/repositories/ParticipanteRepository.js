import conexao from "../database/conexao.js";

class ParticipanteRepository {

    // CRUD
    // Adicionar um nova participante
    create(nome_req, matricula_req, curso_req,campus_req, email_req, dataHoraRequisicao) {
        const sql_inserir_participante = "INSERT INTO participante (nome_participante,matricula, curso, campus, email, registro_entrada) VALUES ($1,$2,$3,$4,$5,$6)"

        // Realizando uma consulta ASSINCRONA
        return new Promise((resolve, reject) => {
            // Realizando Preenchimento no DB 
            conexao.query(
                sql_inserir_participante,
                [nome_req, matricula_req, curso_req, campus_req, email_req,dataHoraRequisicao],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possivel cadastrar !')
                    } else {
                        return resolve('Usuário cadastrado !')
                    }
                })
        })
    }

    update(nome_req, matricula_req,dataHoraRequisicao){

        const sql1 = "UPDATE participante SET registro_saida = '2050-10-22 22:31:00' WHERE nome_participante ='Joao' and matricula = '22'"
        const sql = "UPDATE participante SET ? WHERE nome_participante = $1 and matricula = $2 "
    }

    

}


export default new ParticipanteRepository()