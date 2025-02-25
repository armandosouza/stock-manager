const express = require('express')

const {Produto} = require('../models/Produto')
const {Categoria} = require('../models/Categoria')

const autenticarToken = require('../middlewares/auth')

const router = express.Router()

//Criar um novo produto
router.post('/produto', autenticarToken, async (req, res) => {
    try {
        const {nome, descricao, quantidade_em_estoque, preco, categoriaId} = req.body

        if(!nome || !descricao || !quantidade_em_estoque || !preco || !categoriaId) {
            return res.status(404).json({msg: "Campo inválido ou em branco!"})
        }

        await Produto.create({
            nome, descricao, quantidade_em_estoque, preco, categoriaId
        })

        res.status(201).json({
            msg: 'Produto criado com sucesso!'
        })
    } catch(error) {
        res.status(500).json({msg: "Houve um erro ao criar o produto!", error})
    }
})

// Obter todos os produtos
router.get('/produtos', autenticarToken, async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: Categoria
        })
        res.status(200).json(produtos)
    } catch(error) {
        res.status(500).json({msg: 'Houve um erro ao obter produtos!', error})
    }
})

module.exports = router