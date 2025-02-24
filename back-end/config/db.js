require('dotenv').config();
const { Sequelize } = require('sequelize');

// Lendo as variáveis de ambiente
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Criação da instância do Sequelize com configurações adicionais
const sequelize = new Sequelize('stock_manager', DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4',
    },
    logging: process.env.NODE_ENV !== 'production',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com sucesso com o MySQL!');
    } catch (error) {
        console.error('Erro na conexão com o BD:', error);
        process.exit(1);
    }
};

module.exports = {
    sequelize, connectDB
};
