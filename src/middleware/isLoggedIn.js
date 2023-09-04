const prisma = require('../config/prisma.js')
const jwt = require('jsonwebtoken')

const isLoggedIn = async(req, res, next) => {

    try {
        const token = req.cookies.token

        if (!token) {
            res.send('entre na sua conta por favor')
            throw new Error('Você não esta logado')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findUnique({
            where:{
                id: decoded.userId
            }
        })

        next()
        
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = isLoggedIn