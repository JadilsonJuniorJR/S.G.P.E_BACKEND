// Importando conexão do BD
import pg from 'pg';

// Conexão Do Banco 
// const conexao = new pg.Client(
//     {
//         host: 'localhost',
//         port: 5432,
//         user: 'postgres',
//         password: 'admin',
//         database: 'SGPE'
//     }
// )

//Conexão Do Banco 
const conexao = new pg.Client(
    {
        connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    }
)

conexao.connect()

export const consulta = (sql, valores= ' ', mensagemReject) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, valores, (erro,resultado) => {
            if (erro) { return reject(mensagemReject) }
            const retorno = JSON.parse(JSON.stringify(resultado.rows))
            return resolve(retorno)
        })
    })
}
export default conexao
