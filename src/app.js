//ARQUIVO DE ROTAS

// Importando bibliotecas
import express from "express";
import cors from "cors";

// Importando Função
import EventoController from "./app/controller/EventoController.js";
import ParticipantesController from "./app/controller/ParticipantesController.js";
import QrcodeController from "./app/controller/QrcodeController.js";

import ListarEvento from "./app/services/ListarEvento.js"
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

// Gerar Lista CSV Eventos
app.post('/evento/listar_evento',  ListarEvento.evento)

// Gerar Lista CSV Participante
app.post('/evento/listar_participantes',  ListarEvento.participante)

// Cadastrar Usuario
app.post('/participante/cadastrar', ParticipantesController.store)

//Confirmar Usuario
app.put('/participante/confirmar/:nome/:matricula', ParticipantesController.update)

// Gerar QRCODE Entrada
app.post('/qrcode/gerar', QrcodeController.create)

app.post('/qrcode/gerar_saida', QrcodeController.create)
// Exportando a instancia do APP 
export default app


