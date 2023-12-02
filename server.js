// ARQUIVO DO SERVIDOR 

// Importando o APP 
import app from './src/app.js'

import dotenv from 'dotenv';
dotenv.config();

// Inicializando a Porta
const PORT = process.env.port || 8080;

// Porta Aberta do servidor 
app.listen(PORT, () => {
  console.log(`Servidor Funcionando na porta: ${PORT}`);
})

