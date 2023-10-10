// ARQUIVO DO SERVIDOR 

// Importando o APP 
import app from './src/app.js'


// Inicializando a Porta
const PORT = process.env.port || 8080;


// Rodando o servidor
app.listen(PORT, () => {
    console.log(`Servidor Funcionando na porta: ${PORT}`);
  });
  