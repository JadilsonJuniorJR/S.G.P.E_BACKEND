import EventoRepository from "../repositories/EventoRepository.js";
import ParticipanteRepository from "../repositories/ParticipanteRepository.js";
import moment from 'moment'
class VerificarPresenca {

    async verificar(participante) {
        // REALIZA A BUSCA DO EVENTO DO USUARIO INFORMADO
        const resposta_consulta = await EventoRepository.findById(participante[0].fk_id_evento)
        console.log("PARTICIPANTE")
        console.log(participante)


        // RESGATANDO OS DADOS DO USUARIO DOS CAMPOS DE ENTRADA, SAIDA (DATA,HORA), E PARTICIPAÇÃO
        const entrada_participante = moment(participante[0].registro_entrada).format('YYYY-MM-DD HH:mm').split(' ');
        const saida_participante = moment(participante[0].registro_saida).format('YYYY-MM-DD HH:mm').split(' ');
        let validar_participacao = participante[0].participacao

        console.log("DATA ENTRADA: ", entrada_participante[0])
        console.log("HORA ENTRADA: ", entrada_participante[1])
        console.log("REGISTRO SAIDA: ", saida_participante[1])

        console.log("EVENTO")

        // RESGATANDO OS DADOS DO EVENTO (DATA, HORA E TOLERANCIA)
        const entrada_evento = moment(resposta_consulta[0].data_inicio).format('YYYY-MM-DD');
        const saida_evento = moment(resposta_consulta[0].data_termino).local().format('DD-MM-YYYY');
        console.log("DATA ENTRADA EVENTO: " + entrada_evento)

        const hora_entrada_evento = moment(resposta_consulta[0].hora_inicio, 'HH:mm')
        const hora_termino_evento = resposta_consulta[0].hora_termino;

        const tolerancia_evento = moment(resposta_consulta[0].tolerancia, 'mm')
        const minutosParaAdicionar = tolerancia_evento.minutes()
        console.log("Hora entrada Original do Evento: ", hora_entrada_evento.format('HH:mm'))
        console.log("Minutos de Tolerancia: ", tolerancia_evento.format('mm'))

        // DEFENINDO A ENTRADA COM O TEMPO DE TOLERANCIA
        // Adicionando minutos no Objeto 
        const entrada_tolerancia_evento = hora_entrada_evento.add(minutosParaAdicionar, 'minutes')
        const entrada_tolerancia_evento_objeto = moment(entrada_tolerancia_evento, 'minutes');

        console.log("ENTRADA TOLERANCIA CONVERTIDO MOMENT")
        console.log(entrada_tolerancia_evento)
        console.log(" ")
        console.log("TOLERTANCIA")
        console.log("Hora com tolerancia entrada FORMATADO: " + entrada_tolerancia_evento.format('HH:mm'))
        console.log("Hora que o partipante entrou: " + entrada_participante[1])



        const entrada_participante_Objeto = moment(entrada_participante[1], 'HH:mm')




        // Verifica se a data de presença confere com a data de realização do evento
        if (moment(entrada_participante[0]).isSame(entrada_evento)) {
            console.log("Dia certo")
            // Verifica se a hora que o Participante chegou é igual ou inferior da Hora permitida (com a tolerancia aplicada) 
            if (entrada_participante_Objeto.isSameOrBefore(entrada_tolerancia_evento)) {
                console.log("Chegou igual ou antes da Hora")
                validar_participacao = true
                await ParticipanteRepository.update(participante[0].nome_participante, participante[0].matricula, saida_participante, validar_participacao)
                console.log("*/*/*/*/*/*/*/*/*//*/*/*/*")
            } else {
                console.log("Chegou Atrasado")
                validar_participacao = false
                await ParticipanteRepository.update(participante[0].nome_participante, participante[0].matricula, saida_participante, validar_participacao)
                console.log("HORA ERRADA")
                console.log("*/*/*/*/*/*/*/*/*//*/*/*/*")
            }

        } else {
            validar_participacao = false
            console.log(validar_participacao)
            console.log("DIA ERRADO")
            await ParticipanteRepository.update(participante[0].nome_participante, participante[0].matricula, saida_participante, validar_participacao)
            console.log("*/*/*/*/*/*/*/*/*//*/*/*/*")
        }

    }
}

export default new VerificarPresenca()