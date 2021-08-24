const express = require('express');
const app = express();
const port = 3000;

// Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/profile', (req, res) => {
    res.render("principal/perfil");
});

app.listen(port, () => {
    console.log("App está rodando!");
});