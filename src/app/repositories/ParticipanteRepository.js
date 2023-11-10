import conexao from "../database/conexao.js";

class ParticipanteRepository {

    // CRUD
    // Adicionar um nova participante
    create(nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao, id_evento_req) {
        const sql_inserir_participante = "INSERT INTO participante (nome_participante,matricula, curso, campus, email, registro_entrada, fk_id_evento) VALUES ($1,$2,$3,$4,$5,$6,$7)"
        return consulta(sql_inserir_participante, [nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao, id_evento_req], 'Não foi possivel cadastrar')
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

    // Procurar todos os Usuario 
    findAll() {
        const sql_consultar = "SELECT * FROM participante ";
        // Realizando uma consulta ASSINCRONA
        return new Promise((resolve, reject) => {
            conexao.query(sql_consultar, (erro, resultado) => {
                if (erro) {
                    return reject('Não foi possivel localizar')
                    res.status(404).json({ 'ERRO': 'TABELA INEXISTENTE' })
                } else {
                    // Transformando o resultado da Busca em um JSON 
                    console.log("CHEGOU AQUI ")
                    const consulta_JSON = JSON.parse(JSON.stringify(resultado.rows))
                    return resolve(consulta_JSON)
                    res.status(200).json({ resultado: resultado.rows })
                }
            })
        })
    }

    // Procurando Usuario Especifico
    findById(nome_req, matricula_req) {
        const sql2 = "SELECT * FROM participante WHERE nome_participante='Joao' and matricula = '1'"
        const sql = "SELECT * FROM participante WHERE nome_participante=$1 and matricula =$2"
        // console.log(nome_req)
        return consulta(sql, [nome_req, matricula_req], 'Não foi possivel Localizar')
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