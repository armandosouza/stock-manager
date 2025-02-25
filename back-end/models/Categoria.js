const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/db')
const {Produto} = require('./Produto')

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {
    Categoria
}