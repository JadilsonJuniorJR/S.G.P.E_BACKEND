import { consulta } from "../database/conexao.js";

class UsuarioRepository {

    // Buscar Evento Especifico
    findById(nome_user, senha_user) {

        const sql = 'SELECT nome_usuario FROM administrador WHERE nome_usuario= $1 and senha = $2  '
       
        return consulta(sql, [nome_user,senha_user], 'Não foi possivel Localizar')
    }

}


export default new UsuarioRepository()