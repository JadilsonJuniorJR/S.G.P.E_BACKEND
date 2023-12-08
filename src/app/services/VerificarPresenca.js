import EventoRepository from "../repositories/EventoRepository.js";
import ParticipanteRepository from "../repositories/ParticipanteRepository.js";
import moment from 'moment'
class VerificarPresenca {

    async verificar(participante) {
        // REALIZA A BUSCA DO EVENTO DO USUARIO INFORMADO
        const resposta_consulta = await EventoRepository.findById(participante[0].fk_id_evento,'1')
        // console.log("PARTICIPANTE")
        // console.log(participante[0])


        // RESGATANDO OS DADOS DO USUARIO DOS CAMPOS DE ENTRADA, SAIDA (DATA,HORA), E PARTICIPAÇÃO
        let entrada_participante = moment(participante[0].registro_entrada).format('YYYY-MM-DD HH:mm').split(' ');
        const saida_participante = moment(participante[0].registro_saida).format('YYYY-MM-DD HH:mm').split(' ');
        let validar_participacao = participante[0].participacao
        let data_entrada =  moment(entrada_participante[0]).format('YYYY-DD-MM')
        // console.log("DATA ENTRADA: ", data_entrada)
        // console.log("HORA ENTRADA: ", entrada_participante[1])
        // console.log("REGISTRO SAIDA: ", saida_participante[1])
        // console.log("DATA SAIDA: ", saida_participante[0])

        // console.log("EVENTO")
        // console.log(resposta_consulta)

        // RESGATANDO OS DADOS DO EVENTO (DATA, HORA E TOLERANCIA)
        const entrada_evento = moment(resposta_consulta[0].data_inicio).format('YYYY-MM-DD');
        const saida_evento = moment(resposta_consulta[0].data_termino).format('YYYY-MM-DD');
        // console.log("DATA ENTRADA EVENTO: " + entrada_evento)

        const hora_entrada_evento = moment(resposta_consulta[0].hora_inicio, 'HH:mm')
        const hora_termino_evento = moment(resposta_consulta[0].hora_termino, 'HH:mm')

        const tolerancia_evento = moment(resposta_consulta[0].tolerancia, 'mm')
        const minutosParaAdicionar = tolerancia_evento.minutes()
        // console.log("Hora entrada Original do Evento: ", hora_entrada_evento.format('HH:mm'))
        // console.log("Minutos de Tolerancia: ", tolerancia_evento.format('mm'))

        // DEFENINDO A ENTRADA COM O TEMPO DE TOLERANCIA
        // Adicionando minutos no Objeto 
        const entrada_tolerancia_evento = hora_entrada_evento.add(minutosParaAdicionar, 'minutes')
        const saida_tolerancia_evento = hora_termino_evento.add(minutosParaAdicionar, 'minutes')

        // console.log("Entrada com tolerancia: ")
        // console.log(entrada_tolerancia_evento)
        // console.log("Saida com tolerancia: ")
        // console.log(saida_tolerancia_evento)
        // HORA QUE O PARTICIPANTE ENTROU E SAIU
        const entrada_participante_Objeto = moment(entrada_participante[1], 'HH:mm')
        const saida_participante_Objeto = moment(saida_participante[1], 'HH:mm')
       
        // console.log("Objeto entrada: ")
        // console.log(entrada_participante_Objeto)

        // console.log('')
        // console.log('')
        // console.log('Entrada Participante')
        // console.log(entrada_participante[0])
        // console.log(entrada_participante)
        // console.log(moment(entrada_participante[0],'YYYY-MM-DD').format('YYYY-MM-DD'))
        // console.log('Entrada Evento')
        // console.log(entrada_evento)
        // console.log('')

        // Verifica se a data de presença confere com a data de realização do evento
        if (moment(entrada_participante[0]).isSame(entrada_evento)) {
            console.log("Dia certo")
            // Verifica se a hora que o Participante chegou é igual ou inferior da Hora permitida (com a tolerancia aplicada) 
            if ((entrada_participante_Objeto.isSameOrBefore(entrada_tolerancia_evento)&& (saida_participante_Objeto.isSameOrBefore(saida_tolerancia_evento))) ) {
                console.log("Chegou igual ou antes da Hora")
                validar_participacao = true
                await ParticipanteRepository.update(participante[0].nome_participante, participante[0].matricula, saida_participante, validar_participacao)
            } else {
                console.log("Chegou Atrasado")
                validar_participacao = false
                await ParticipanteRepository.update(participante[0].nome_participante, participante[0].matricula, saida_participante, validar_participacao)
            }

        } else {
            console.log("DATA ERRADA")
            validar_participacao = false
            await ParticipanteRepository.update(participante[0].nome_participante, participante[0].matricula, saida_participante, validar_participacao)
        }

    }
}

export default new VerificarPresenca()