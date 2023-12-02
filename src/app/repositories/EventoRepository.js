import { consulta } from "../database/conexao.js";

class EventoRepository {

    // Criar um novo Evento
    create(nome_req, data_inicio, hora_inicio, data_termino, hora_termino, tolerancia, descricao_req) {
        const sql_inserir_evento = "INSERT INTO evento (nome_evento,data_inicio,hora_inicio, data_termino, hora_termino, tolerancia,descricao) VALUES ($1,$2,$3,$4,$5,$6,$7)"

        return consulta(sql_inserir_evento, [nome_req, data_inicio, hora_inicio, data_termino, hora_termino, tolerancia, descricao_req], 'Não foi possivel cadastrar!')

        // Realizando uma consulta ASSINCRONA
        return new Promise((resolve, reject) => {
            // Realizando consulta no DB 


            conexao.query(
                sql_inserir_evento,
                [nome_req, data_inicio, hora_inicio, data_termino, hora_termino, tolerancia, descricao_req],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possivel cadastrar !')
                    } else {
                        // Transformando o resultado da Busca em um JSON 
                        // const consulta_JSON = JSON.parse(JSON.stringify(resultado.rows))
                        // console.log(consulta_JSON)
                        return resolve('Evento cadastrado !')
                    }
                })
        })

    }

    // Buscar Todos 
    findAll() {
        const sql_consultar = "SELECT * FROM evento ";
        // Realizando uma consulta ASSINCRONA
        return consulta(sql_consultar, '', 'Não foi possível localizar!')

        return new Promise((resolve, reject) => {
            conexao.query(sql_consultar, (erro, resultado) => {
                if (erro) {
                    return reject('Não foi possivel localizar')
                    res.status(404).json({ 'ERRO': 'TABELA INEXISTENTE' })
                } else {
                    // Transformando o resultado da Busca em um JSON 
                    const consulta_JSON = JSON.parse(JSON.stringify(resultado.rows))
                    return resolve(consulta_JSON)
                    res.status(200).json({ resultado: resultado.rows })
                }
            })
        })
    }

    // Buscar Evento Especifico
    findById(id_evento, opc) {
        // if (opc == 1) {
        //     let sql = "SELECT id_evento,nome_evento, data_inicio, hora_inicio, data_termino, hora_termino,tolerancia, descricao FROM evento WHERE id_evento =$1"

        //     return consulta(sql, [id_evento], 'Não foi possivel Localizar')
        // } else if (opc == 2) {
        //     const sql = "SELECT nome_participante, matricula, curso, campus, email, registro_entrada, registro_saida, participacao FROM participante WHERE fk_id_evento =$22 "
        //     return consulta(sql, [id_evento], 'Não foi possivel Localizar')
        // }
        // const sql = "SELECT * FROM evento WHERE id_evento =$1"
        // return consulta(sql, [id_evento], 'Não foi possivel Localizar')
        let sql = ''

        // REALIZANDO A CONSULTA DE ACORDO COM A ESCOLHA DO USUARIO
        switch (opc) {
            case '1':
                // SELECIONA EVENTOS ESPECIFICO
                sql = 'SELECT id_evento,nome_evento, data_inicio, hora_inicio, data_termino, hora_termino,tolerancia, descricao FROM evento WHERE id_evento =$1'
                break;
            case '2':
                // SELECIONA TODOS OS EVENTOS
                sql = 'SELECT * FROM evento'
                return consulta(sql, '', 'Não foi possivel Localizar')
                break;
            case '3':
                // SELECIONA SOMENTE OS PARTICIPANTES COM FREQUENCIA VERIFICADA (ENTRADA E SAIDA)
                // sql = "SELECT id_evento,nome_evento, data_inicio, hora_inicio, data_termino, hora_termino,tolerancia, descricao FROM evento WHERE id_evento =$1"
                sql = 'SELECT nome_participante, matricula, curso, campus, email, registro_entrada, registro_saida, participacao FROM participante WHERE fk_id_evento =$1 AND participacao = true'
                break;
            case '4':
                // SELECIONA TODOS OS PARTICIPANTES DO EVENTO
                sql = 'SELECT nome_participante, matricula, curso, campus, email, registro_entrada, registro_saida, participacao FROM participante WHERE fk_id_evento = $1'
                break;
            case '5':
                sql = 'SELECT id_evento FROM evento WHERE id_hash = $1'
        }
        return consulta(sql, [id_evento], 'Não foi possivel Localizar')
    }

    // Atualizar 
    update() {

    }
    // Deletar
    delete() {

    }

}


export default new EventoRepository()