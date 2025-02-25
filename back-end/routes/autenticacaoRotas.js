const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const {Usuario} = require('../models/Usuario')

const router = express.Router()

// cadastro de usuários
router.post('/registro', async (req, res) => {
    try {
        const {nome, email, senha, cargo} = req.body
        
        const usuarioRegistrado = await Usuario.findOne({where: {email}})
        if(usuarioRegistrado) {
            return res.status(409).json({msg: "E-mail já foi cadastrado!"})
        }

        await Usuario.create({nome, email, senha, cargo})
        res.status(201).json({msg: "Usuário criado com sucesso!"})
    } catch (error) {
        res.status(500).json({msg: "Erro ao criar usuário!"})
        console.error(`Ocorreu um erro: ${error}`)
    }
})

// login de usuário
router.post('/login', async (req, res) => {
    try {
        const {email, senha} = req.body

        const usuario = await Usuario.findOne({where: {email}})
        if(!usuario) {
            return res.status(404).json({msg: "E-mail inválido ou usuário não existe!"})
        }

        const senhaValida = bcrypt.compare(senha, usuario.senha)
        if(!senhaValida) {
            return res.status(401).json({msg: "Senha inválida!"})
        }

        const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {
            expiresIn: '6h'
        })

        res.status(200).json({
            token,
            msg: "Login efetuado com sucesso!"
        })
    } catch(error) {
        res.status(500).json({msg: "Erro ao fazer login!"})
        console.error(`Erro ao fazer login: ${error}`)
    }
})

module.exports = router