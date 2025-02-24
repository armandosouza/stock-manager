const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), // Usando DECIMAL para garantir precisão financeira
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = {
    Produto
};
