const express = require('express');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');

const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o BD realizada com sucesso!");
    })
    .catch((msgError) => {
        console.log(msgError);
    });

// Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs');
// Usando arquivos estáticos (.html, .css, .img), pasta padrão de mercado é "public"
app.use(express.static('public'));

/*
    O body parser é o agente com o objetivo de traduzir os dados enviados pelo formulário
    em uma estrutura JavaScript e aplicarmos em nosso Back-End
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvar-pergunta', (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // INSERT INTO
    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log("App está rodando!");
});