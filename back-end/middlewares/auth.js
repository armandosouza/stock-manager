const jwt = require('jsonwebtoken')

const autenticarToken = (req, res, next) => {
    const token = req.headers['authorization']
    console.log(token)
    
    if(!token) {
        return res.status(401).json({msg: "Acesso não autorizado!"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({msg: "Token inválido ou expirado!"})
        }

        req.user = decoded

        next()
    })
}

module.exports = autenticarToken