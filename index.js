const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

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

    res.json({
        msg: "Dados enviados com sucesso!",
        titulo,
        descricao
    });
});

app.listen(port, () => {
    console.log("App está rodando!");
});