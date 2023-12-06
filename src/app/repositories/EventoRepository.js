import { consulta } from "../database/conexao.js";

class EventoRepository {

    // Criar um novo Evento
    create(nome_req, data_inicio, hora_inicio, data_termino, hora_termino, tolerancia, descricao_req) {
        const sql_inserir_evento = "INSERT INTO evento (nome_evento,data_inicio,hora_inicio, data_termino, hora_termino, tolerancia,descricao) VALUES ($1,$2,$3,$4,$5,$6,$7)"
        return consulta(sql_inserir_evento, [nome_req, data_inicio, hora_inicio, data_termino, hora_termino, tolerancia, descricao_req], 'Não foi possivel cadastrar!')
    }

    // Buscar Todos 
    findAll() {
        const sql_consultar = "SELECT * FROM evento ";
        // Realizando uma consulta ASSINCRONA
        return consulta(sql_consultar, '', 'Não foi possível localizar!')
    }

    // Buscar Evento Especifico
    findById(id_evento, opc) {
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
    update(nome_evento, data_inicio) {
        let sql = 'SELECT id_evento FROM evento WHERE nome_evento =$1 and data_inicio=$2'
        const res= consulta(sql, [nome_evento,data_inicio], 'Não foi possível localizar!')
        console.log(res)
        return res
    }
    // Deletar
    delete() {

    }

}


export default new EventoRepository()