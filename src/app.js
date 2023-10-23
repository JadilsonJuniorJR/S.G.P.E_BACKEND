//ARQUIVO DE ROTAS

// Importando bibliotecas
import express from "express";
import cors from "cors";

// Importando Função
import SelecaoController from "./app/controller/SelecaoController.js";
import ParticipantesController from "./app/controller/ParticipantesController.js";

// Inicializando o Express
const app = express();

// Indicando para o Express ler o Body da requisição com o JSON
app.use(express.json());
app.use(cors());



//Criando rotas (ENDPOINT)

// Selecionando todos os eventos
app.get('/evento/buscar_eventos', SelecaoController.index )

// Cadastrar Eventos
app.post('/evento/cadastrar_evento', SelecaoController.store)


// Cadastrar Usuario
app.post('/participante/cadastrar', ParticipantesController.store)


// Confirmar Usuario
app.post('/participante/confirmar', ParticipantesController.store)



// Exportando a instancia do APP 
export default app


