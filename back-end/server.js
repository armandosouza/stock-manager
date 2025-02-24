const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const cors = require('cors');
const { Usuario } = require('./models/Usuario');
const { Produto } = require('./models/Produto');

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

const sincronizarDB = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Sincronização realizada com sucesso!');
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.log('Erro ao sincronizar a tabela', error);
        process.exit(1);
    }
};

sincronizarDB();
