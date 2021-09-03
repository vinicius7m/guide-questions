// const { Sequelize, DataTypes } = require('sequelize');
const Sequelize = require('sequelize'); 
const connection = require('./database');

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false, // allowNull = NOT NULL
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}, {/* OPTIONS */});

/*

Pergunta
- id (AI, PK, NOT NULL) - padrão Sequeliza
- titulo
- descricao
- updatedAt - padrão Sequelize
- createdAt - padrão Sequelize

*/

// Se não existir a tabela "Pergunta", então será criada (IF NOT EXISTS)
Pergunta.sync({ force: false }).then(() => {
    console.log("Tabela criada!");
});
// { force: false } - Não "força" a criação da tabela, quando já criada
// model.sync(options)