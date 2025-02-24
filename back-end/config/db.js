require('dotenv').config()
const {Sequelize} = require('sequelize')

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const sequelize = new Sequelize('stock_manager', DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexão com sucesso com o MySQL!')
    } catch(error) {
        console.error('Erro na conexão com o BD:', error)
        process.exit(1)
    }
}

module.exports = {
    sequelize, connectDB
}