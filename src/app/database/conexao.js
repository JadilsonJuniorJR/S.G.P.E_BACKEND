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
);
conexao.connect()
export default conexao
