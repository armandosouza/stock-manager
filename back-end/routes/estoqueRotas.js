const express = require('express')

const {HistoricoEstoque} = require('../models/HistoricoEstoque')
const {Produto} = require('../models/Produto')
const autenticarToken = require('../middlewares/auth')
const { Op } = require('sequelize')

const router = express.Router()

// Criar movimentação de entrada no estoque
router.post('/estoque/entrada', autenticarToken, async (req, res) => {
    try {
        const {tipo, quantidade, produtoId} = req.body

        if(!tipo || !quantidade || !produtoId) {
            return res.status(404).json({msg: "Campo inválido ou em branco"})
        }

        if(tipo !== 'Entrada') {
            return res.status(422).json({msg: "Tipo inválido de movimentação de estoque! (válido apenas Entrada)"})
        }

        await HistoricoEstoque.create({tipo, quantidade, produtoId})
        res.status(201).json({msg: "Movimentação de entrada no estoque criada com sucesso!"})
    } catch(error) {
        res.status(500).json({msg: "Houve um erro ao criar entrada de estoque!", error})
    }
})

// Criar movimentação de saída do estoque -> aumento de qtde. de um produto na loja
router.post('/estoque/saida', autenticarToken, async (req, res) => {
    try {
        const {tipo, quantidade, produtoId} = req.body
        const produto = await Produto.findByPk(produtoId)

        if(!tipo || !quantidade || !produtoId) {
            return res.status(404).json({msg: "Campo inválido ou em branco"})
        }

        if(tipo !== 'Saída') {
            return res.status(422).json({msg: "Tipo inválido de movimentação de estoque! (válido apenas Saída)"})
        }

        if(!produto) {
            return res.status(404).json({msg: "Produto não encontrado!"})
        }

        produto.quantidade += quantidade
        await produto.save()

        await HistoricoEstoque.create({tipo, quantidade, produtoId})
        res.status(201).json({msg: 'Movimentação de saída criada com sucesso!'})
    } catch(error) {
        res.status(500).json({msg: 'Houve um erro ao criar saída de estoque!', error})
    }
})

// Obter movimentações de estoque de um produto
router.get('/estoque/:id', autenticarToken, async (req, res) => {
    try {
        const produtoId = req.params.id
        const {dataInicio, dataFim} = req.query

        const produto = await Produto.findByPk(produtoId)
        if(!produto) {
            return res.status(404).json({msg: 'Produto não encontrado!'})
        }

        const filtro = {
            where: {
                produtoId
            }
        }

        if(dataInicio || dataFim) {
            filtro.where.createdAt = {
                [Op.between]: [new Date(dataInicio ? dataInicio : null), new Date(dataFim ? dataFim : null)]
            }
        }

        const historico = await HistoricoEstoque.findAll(filtro)
        return res.status(200).json(historico)
    } catch(error) {
        return res.status(500).json({msg: 'Houve um erro ao obter histórico do estoque', error})
    }
})

module.exports = router