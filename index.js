const express = require('express');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');

const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

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
    // findAll({raw, order}) - SELECT * FROM `perguntas`
    // order: [['column', 'asc/desc']] - order by
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']  
    ] }).then(perguntas => {
        res.render('index', {
            perguntas: perguntas        
        });
    });
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvar-pergunta', (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // INSERT INTO create({ columns: values }).then() - Promise
    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;

    // select * from perguntas where id = 1;
    Pergunta.findOne({
        where: { id: id },   
    }).then(pergunta => {
        if(pergunta != undefined) { // Pergunta encontrada
            
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ],
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas,
                });
            });
        } else { // Não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId,
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`);
    });
});

app.listen(port, () => {
    console.log("App está rodando!");
});