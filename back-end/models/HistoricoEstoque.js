const { DataTypes } = require("sequelize")
const { sequelize } = require('../config/db')
const { Produto } = require('./Produto')

const HistoricoEstoque = sequelize.define('HistoricoEstoque', {
    tipo: {
        type: DataTypes.ENUM('Entrada', 'Saída'),
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = {
    HistoricoEstoque
}