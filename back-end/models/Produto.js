const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    quantidade_em_loja: {
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
