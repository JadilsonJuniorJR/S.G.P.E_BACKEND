import UsuarioRepository from "../repositories/UsuarioRepository.js";


class UsuarioController {

    async show(req, res) {
        const nome_req = req.body.dados.nome_user;
        const senha_req = req.body.dados.senha_user;
        const resposta_consulta = await UsuarioRepository.findById(nome_req, senha_req)

        if (resposta_consulta.length == 0) {
            res.status(404).json({ Erro: 'Usuário não localizado no sistema!' })
        } else {
            res.json(resposta_consulta.rowCount)
        }

        res.status(200)

    }

}

export default new UsuarioController()