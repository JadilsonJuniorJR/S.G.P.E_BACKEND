import ParticipanteRepository from "../repositories/ParticipanteRepository.js";
// Classe Responsavel por Chama os Metodos do CRUD 
// Responsavel pelas respostas para os usuarios 
class ParticipanteController {

    // Cadastrar Participante
    async store(req, res) {
        // console.log(req.body)
        const dataHoraRequisicao = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        const nome_req = req.body.dados.nome_user;
        const matricula_req = req.body.dados.matricula;
        const curso_req = req.body.dados.curso;
        const campus_req = req.body.dados.campus;
        const email_req = req.body.dados.email;
        
        // console.log(dataHoraRequisicao)
        const resultado_criacao = await ParticipanteRepository.create(nome_req, matricula_req, curso_req, campus_req, email_req,dataHoraRequisicao)
        res.json(resultado_criacao)
      
    }
    // Atualizar Dado do Usuario 
    async update(req,res){
        const nome_req = req.body.dados.nome_user;
        const matricula_req = req.body.dados.matricula;

        
    }

    // Verificar usuario
    async show(req, res) {

        const email_req = req.body.evento.email;
    }

}

// Padrao Singleton
export default new ParticipanteController()