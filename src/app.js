//ARQUIVO DE ROTAS

// Importando bibliotecas
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


// Inicializando o Express
const app = express();

// Indicando para o Express ler o Body da requisição com o JSON
app.use(express.json());
app.use(cors());

import pg from 'pg';

// Conexão Do Banco 
const client = new pg.Client(
    {
        user: 'postgres',
        password: 'admin',
        host: 'localhost',
        port: 5432,
        database: 'SGPE'
    }
);

client.connect();

//Porta Raiz 
app.get('/', (req, res) => {
    res.send('ROTA PRINCIPAL')
})

//Criando novas rotas (ENDPOINT)
app.get('/evento/buscar_eventos', function (req, res) {
    client.query({
        text: "SELECT * FROM evento ",
    })
        .then((retorno) => {
            let array = []
            for (let eventos of retorno.rows) {
                array.push(
                    {
                        id_evento: eventos.id_evento,
                        nome_evento: eventos.nome_evento,
                        organizador: eventos.organizador,
                        descricao: eventos.descricao
                    }
                )
            }
            // console.log(retorno.rows)
            res.status(200).send({
                status: 200,
                resultado: retorno.rows
            })
        }


        )
})



app.post('/evento/cadastrar_evento',  (req, res) => {
    console.log(req.body)
    const nome_req = req.body.evento.nome_evento;
    const data_inicio = req.body.evento.data_inicio;
    const hora_inicio = req.body.evento.hora_inicio;
    const data_termino = req.body.evento.data_termino;
    const hora_termino = req.body.evento.hora_termino;
    const tolerancia = req.body.evento.tolerancia;
    const descricao_req = req.body.evento.descricao;
    
    hora_inicio-hora_termino
    // const {nome_req,data_inicio,hora_inicio,data_termino,hora_termino,descricao_req} = req.body.evento
    console.log(descricao_req)
    client.query({
        text: "INSERT INTO evento (nome_evento,data_inicio,hora_inicio, data_termino, hora_termino, tolerancia,descricao) VALUES ($1,$2,$3,$4,$5,$6,$7) ",
        values: [nome_req, data_inicio, hora_inicio, data_termino,hora_termino, tolerancia,descricao_req]
    }).then(
        function () {
            res.status(200).send({
                status: 'OK',
                sucesso: true
            })
        }
    )
    // .finally(()=> client.end())
})





// Exportando a instancia do APP 
export default app


