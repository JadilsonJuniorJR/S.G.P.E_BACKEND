// Arquivo que cuida das Rotas

// Importando Bibliotecas
const { Router } = require("express");
const http = require("http");

const listar_eventosController = require("../controller/eventos/listarEventosController");

// Criando a rota
const routes = new Router();

routes.get("/", (req, res) => {
  res.send("Trabalho de TCC!");
});

// Criando Rota para acessar todos os Eventos
routes.get("/listar_eventos", listar_eventosController.getAll);

// Trava todas as solicitações com o metodo PUT
routes.put("/api/*", (req, res) => {
  return res.status(400).end();
});

// Travando o acesso ao DB
routes.get("/api/db", (req, res) => {
  return res.status(404).end(http.STATUS_CODES[404]);
});

// Exportando a Rota
module.exports = { routes };

// Link para teste
// https://reqbin.com/
// https://hoppscotch.io/
