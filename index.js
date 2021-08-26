const express = require('express');
const app = express();
const port = 8080;

// Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs');
// Usando arquivos estáticos (.html, .css, .img), pasta padrão de mercado é "public"
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.listen(port, () => {
    console.log("App está rodando!");
});