// Importando bibliotecas
const { create, defaults, router } = require("json-server");
const path = require("path");

// Criando Servidor
const server = create();

// Criando Rotas
const apiEndpoints = router(path.join(__dirname, "..", "data", "db.json"), {
  foreignKeySuffix: "_id",
});

// Criando Middleware (rotas intermediadores) para apiEndpoints
const middlewares = defaults();

server.use(middlewares);
server.use(apiEndpoints);

// Exportando
module.exports = { server, apiEndpoints };
