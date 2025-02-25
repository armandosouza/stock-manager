const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const cors = require('cors');

const { Usuario } = require('./models/Usuario');
const { Produto } = require('./models/Produto');
const { HistoricoEstoque } = require('./models/HistoricoEstoque')
const { Categoria } = require('./models/Categoria')

const produtoRotas = require('./routes/produtoRotas')
const autenticacaoRotas = require('./routes/autenticacaoRotas')
const categoriaRotas = require('./routes/categoriaRotas')

const app = express()

connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api', autenticacaoRotas)
app.use('/api', produtoRotas)
app.use('/api/', categoriaRotas)

const sincronizarDB = async () => {
    try {
        Produto.hasMany(HistoricoEstoque, {foreignKey: 'produtoId'})
        Produto.belongsTo(Categoria, {foreignKey: 'categoriaId'})
        HistoricoEstoque.belongsTo(Produto, {foreignKey: 'produtoId'})
        Categoria.hasMany(Produto, {foreignKey: 'categoriaId'})

        await sequelize.sync({ alter: true })
        console.log('Sincronização realizada com sucesso!')
        
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        });
    } catch (error) {
        console.log('Erro ao sincronizar a tabela', error)
        process.exit(1)
    }
};

sincronizarDB()