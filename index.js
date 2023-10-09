const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const qr = require('qr-image')

const pg = require('pg');

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

app.post('/evento/inserir', function (req, res) {
    const nome_req = req.body.evento.nome_evento;
    const data_inicio = req.body.evento.data_inicio;
    const hora_inicio = req.body.evento.hora_inicio;
    const data_termino = req.body.evento.data_termino;
    const hora_termino = req.body.evento.hora_termino;
    const descricao_req = req.body.evento.descricao;
    
    hora_inicio-hora_termino
    // const {nome_req,data_inicio,hora_inicio,data_termino,hora_termino,descricao_req} = req.body.evento
    console.log(nome_req)
    client.query({
        text: "INSERT INTO evento (nome_evento,data_inicial,hora_inicio, data_termino, hora_termino, descricao) VALUES ($1,$2,$3,$4,$5,$6) ",
        values: [nome_req, data_inicio, hora_inicio, data_termino,hora_termino, descricao_req]
    }).then(
        function () {
            res.json({
                status: 'OK',
                sucesso: true
            })
        }
    )
    // .finally(()=> client.end())
})


app.get('/evento/buscar_eventos', function (req, res) {

    client.query({
        text: "SELECT * FROM evento ",
    })

        .then((retorno) => {

            let array = []
            for (eventos of retorno.rows) {
                array.push(
                    {
                        id_evento: eventos.id_evento,
                        nome_evento: eventos.nome_evento,
                        organizador: eventos.organizador,
                        descricao: eventos.descricao
                    }
                )
            }

            // console.log(array)

            // res.json({
            //     status: 'OK',
            //     resultados: array
            // })

            res.json({
                status: 'Ok',
                resultado: retorno.rows
            })
        }
            // res.status(200).send("Esta é uma rota GET simples!")

        )

    ////////////////

    // client.query({
    //     text: "SELECT * FROM evento ",
    // }).then((retorno) => {
    //     // console.log(retorno.rows)


    //     for (const row of retorno.rows) {

    //         console.log(row);
    //       }

    //     res.json({
    //         status: 'OK',
    //         evento: {
    //             id_evento: retorno.rows[0].id_evento,
    //             nome_evento: retorno.rows.nome_evento,
    //             organizador: retorno.rows.organizador,
    //             descricao: retorno.rows.descricao

    //         }
    //     })
    // }
    //     // res.status(200).send("Esta é uma rota GET simples!")

    // )
})

app.post('/participante/cadastrar', function (req, res) {
    const nome_req = req.body.evento.nome_user;
    const matricula_req = req.body.evento.matricula;
    const curso_req = req.body.evento.curso;
    const email_req = req.body.evento.email;

    client.query({
        text: "INSERT INTO participante (nome_participante,matricula, curso, email ) VALUES ($1,$2,$3,$4) ",
        values: [nome_req, matricula_req, curso_req, email_req]
    }).then(
        function () {
            res.json({
                status: 'OK',
                sucesso: true,
            })
        }
    )
})




app.get('/qrcode', (req, res) => {
    console.log("Enviou")
    const url = "https://www.google.com/"
    const code = qr.image(url, { type: 'svg' })

    res.type('svg');
    code.pipe(res)
    console.log("Imagem Gerada")
})


app.listen(3001, () => {
    console.log('Servidor web funcionando');
});


