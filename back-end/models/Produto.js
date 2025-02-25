const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const { HistoricoEstoque } = require('./HistoricoEstoque')
const { Categoria } = require('./Categoria')

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    quantidade_em_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), // Usando DECIMAL para garantir precisão financeira
        allowNull: false,
    }
})

module.exports = {
    Produto
}
