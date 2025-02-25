const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const dataHoje = Date.CURRENT_TIMESTAMP

const Venda = sequelize.define('Venda', {
    total_vendas: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: dataHoje
    }
})

module.exports = {
    Venda
}