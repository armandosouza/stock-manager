const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const VendaProduto = sequelize.define('VendaProduto', {
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = {
    VendaProduto
}