// Importando conexão do BD
import pg from 'pg';

// Conexão Do Banco 
const conexao = new pg.Client(
    {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'admin',
        database: 'SGPE'
    }
)
conexao.connect()

export const consulta = (sql, valores= '', mensagemReject) => {
    console.log("Chegou aqui")
    return new Promise((resolve, reject) => {
        conexao.query(sql, valores, (erro,resultado) => {
            if (erro) { return reject(mensagemReject) }
            const retorno = JSON.parse(JSON.stringify(resultado.rows))
            // console.log(retorno)
            return resolve(retorno)
        })
    })
}
export default conexao
