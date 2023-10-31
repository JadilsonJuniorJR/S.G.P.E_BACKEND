import {consulta} from "../database/conexao.js";

class ParticipanteRepository {

    // CRUD
    // Adicionar um nova participante
    create(nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao) {
        const sql_inserir_participante = "INSERT INTO participante (nome_participante,matricula, curso, campus, email, registro_entrada) VALUES ($1,$2,$3,$4,$5,$6)"
        return consulta(sql_inserir_participante,[nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao], 'Não foi possivel cadastrar')
        // // Realizando uma consulta ASSINCRONA
        // return new Promise((resolve, reject) => {
        //     // Realizando Preenchimento no DB 
        //     conexao.query(
        //         sql_inserir_participante,
        //         [nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao],
        //         (erro) => {
        //             if (erro) {
        //                 return reject('Não foi possivel cadastrar !')
        //             } else {
        //                 return resolve('Usuário cadastrado !')
        //             }
        //         })
        // })
    }

    // Procurando Usuario
    findById(nome_req, matricula_req) {
        const sql2 = "SELECT * FROM participante WHERE nome_participante='Joao' and matricula = '1'" 
        const sql = "SELECT * FROM participante WHERE nome_participante=$1 and matricula =$2" 
        // console.log(nome_req)
        return consulta(sql,[nome_req, matricula_req], 'Não foi possivel Localizar')
        // return new Promise((resolve, reject) => {
        //     conexao.query(
        //         sql,
                
        //         (erro, resultado) => {
        //             if (erro) return reject('Não foi possível localizar')
        //             const rows = JSON.parse(JSON.stringify(resultado))
        //             console.log(rows)
        //             return resolve(rows)
        //         })
        // })
    }

    // Atualizando Saida do usuario
    update(nome_req, matricula_req, dataHoraRequisicao) {

        const sql_inserir_participante = "UPDATE participante SET registro_saida = $3 WHERE nome_participante = $1 and matricula = $2"
        console.log(nome_req, matricula_req, dataHoraRequisicao)
        return consulta(sql_inserir_participante, [nome_req, matricula_req, dataHoraRequisicao], 'Não foi possivel Atualizar')

        // const sql1 = "UPDATE participante SET registro_saida = '2001-10-22 22:31:00' WHERE nome_participante=$1 and matricula = $2"
        // const sql_atualizar_participante = "UPDATE participante SET registro_saida = $3 WHERE nome_participante = $1 and matricula = $2"
        // const values = [dataHoraRequisicao, nome_req, matricula_req]

        

        // console.log(nome_req, matricula_req, dataHoraRequisicao)
        // return new Promise((resolve, reject) => {
        //     // Realizando Atualização no DB 
        //     conexao.query(
        //         sql_atualizar_participante,
        //         [nome_req, matricula_req, dataHoraRequisicao],
        //         (erro, resultado) => {
        //             if (erro) { return reject('Não foi possivel Atualizar !') }

        //             const rows = JSON.parse(JSON.stringify(resultado))
        //             console.log(rows)
        //             return resolve(rows)

        //         })
        // })
    }



}


export default new ParticipanteRepository()