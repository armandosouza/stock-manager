const express = require('express')
const router = express.Router()

const {Categoria} = require('../models/Categoria')

const autenticarToken = require('../middlewares/auth')


// Criar nova categoria
router.post('/categoria', autenticarToken, async (req, res) => {
    try {
        const nome = req.body.nome
        if(!nome) {
            return res.status(404).json({msg: "Campo nome inválido ou vazio!"})
        }

        await Categoria.create({nome})
        res.status(201).json({msg: 'Categoria criada com sucesso!'})
    } catch(error) {
        res.status(500).json({msg: 'Houve um erro ao adicionar categoria!', error})
    }
})

module.exports = router