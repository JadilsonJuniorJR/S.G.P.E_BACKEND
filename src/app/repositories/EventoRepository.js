import conexao from "../database/conexao.js";

class EventoRepository {

    // CRUD
    // Criar um novo elemeto
    create(nome_req, data_inicio, hora_inicio, data_termino, hora_termino, tolerancia, descricao_req) {
        const sql_inserir_evento = "INSERT INTO evento (nome_evento,data_inicio,hora_inicio, data_termino, hora_termino, tolerancia,descricao) VALUES ($1,$2,$3,$4,$5,$6,$7)"

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
    // Atualizar 
    update() {

    }
    // Deletar
    delete() {

    }


}


export default new EventoRepository()