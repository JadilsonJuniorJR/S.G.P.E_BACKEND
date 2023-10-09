// Importando bibliotecas
const express = require("express");
const cors = require("cors");
const { server: api } = require("./src/api/index");
const { routes } = require("./src/routes/index");

// Inicializando o Express
const app = express();
// Inicializando a Porta
const port = process.env.port || 8080;

// Utilizando o CORS (Permite a requissao por links diferentes)
app.use(cors());
// utilizando o express para json
app.use(express.json());

// Usando a Rota criada
app.use(routes);
//Utilizando o API
app.use("/api", api);

// Rodando o servidor
app.listen(port, () => {
  console.log(`Servidor Funcionando na porta: ${port}`);
});
