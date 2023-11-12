import {consulta} from "../database/conexao.js";

class ParticipanteRepository {

    // Adicionar um novo participante
    create(nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao, id_evento_req) {
        const sql_inserir_participante = "INSERT INTO participante (nome_participante,matricula, curso, campus, email, registro_entrada, fk_id_evento) VALUES ($1,$2,$3,$4,$5,$6,$7)"
        return consulta(sql_inserir_participante, [nome_req, matricula_req, curso_req, campus_req, email_req, dataHoraRequisicao, id_evento_req], 'Não foi possivel cadastrar')
    }

    // Procurar todos os Usuario 
    findAll() {
        const sql_consultar = "SELECT * FROM participante ";
        // Realizando uma consulta ASSINCRONA
        const resultado = consulta(sql_consultar, '','Não foi possível localizar!')
        return resultado

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
        const sql = "SELECT * FROM participante WHERE nome_participante=$1 and matricula =$2"
        return consulta(sql, [nome_req, matricula_req], 'Não foi possivel Localizar')
    }

    // Atualizando Saida do usuario
    update(nome_req, matricula_req, dataHoraRequisicao) {
        const sql_inserir_participante = "UPDATE participante SET registro_saida = $3 WHERE nome_participante = $1 and matricula = $2"
        return consulta(sql_inserir_participante, [nome_req, matricula_req, dataHoraRequisicao], 'Não foi possivel Atualizar')
    }

}


export default new ParticipanteRepository()