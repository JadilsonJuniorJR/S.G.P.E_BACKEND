//ARQUIVO DE ROTAS

// Importando bibliotecas
import express from "express";
import cors from "cors";

// Importando Função
import EventoController from "./app/controller/EventoController.js";
import ParticipantesController from "./app/controller/ParticipantesController.js";
import QrcodeController from "./app/controller/QrcodeController.js";

import ArquivarEvento from "./app/services/ArquivarEventos.js"
// Inicializando o Express
const app = express();

// Indicando para o Express ler o Body da requisição com o JSON
app.use(express.json());
app.use(cors());



//Criando rotas (ENDPOINT)

// Selecionando todos os eventos
app.get('/evento/buscar_eventos', EventoController.index )

// Cadastrar Eventos
app.post('/evento/cadastrar_evento', EventoController.store)

app.get('/evento/arquivar_evento',  ArquivarEvento.arquivar)

// Cadastrar Usuario
app.post('/participante/cadastrar', ParticipantesController.store)


// Confirmar Usuario
app.post('/qrcode/gerar', QrcodeController.create)



// import qr from 'qr-image'


// app.get('/qrcode', (req, res) => {
//     console.log("Enviou")
//     const url = "https://www.google.com/"
//     const code = qr.image(url, { type: 'svg' })

//     res.type('svg');
//     code.pipe(res)
//     console.log("Imagem Gerada")
// })


// Exportando a instancia do APP 
export default app


