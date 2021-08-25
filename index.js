const express = require('express');
const app = express();
const port = 8080;

// Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs');
// Usando arquivos estáticos (.html, .css, .img), pasta padrão de mercado é "public"
app.use(express.static('public'));

app.get('/:nome/:lang', (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;

    var exibirMsg = false;

    var produtos = [
        { nome: "Doritos", preco: 3.14 },
        { nome: "Coca-Cola", preco: 5 },
        { nome: "Leite", preco: 1.45 },
        { nome: "Carne", preco: 15.00 },
        { nome: "Red Bull", preco: 6.00 },
        { nome: "Nescau", preco: 4.00 }
    ];

    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Guia do Programador",
        inscritos: 100,
        msg: exibirMsg,
        produtos: produtos,
    });
});

app.listen(port, () => {
    console.log("App está rodando!");
});