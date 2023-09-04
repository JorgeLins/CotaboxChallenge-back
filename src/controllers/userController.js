const prisma = require('../config/prisma.js')
const cookieToken = require('../utils/cookieToken.js')


exports.signup  = async(req, res, next) => {

    try {
        const {username, email, password} = req.body


        if(!username || !email || !password) {
            return res.status(400).send({ error: "Por favor, preencha todos os campos." });
        }

        const user = await prisma.user.create({
            data:{
                username,
                email,
                password,
            }
        })

        const { token, options } = cookieToken(user);


        res.cookie('token', token, options).status(200).send({ user });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "Ocorreu um erro ao processar sua solicitação." });
    }
}

exports.login = async(req, res) =>{
    try {
        const {email,password} = req.body

        if(!email || !password) {
            throw new Error("por favor coloquei o email e a senha.")
        }

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        
        if(!user) {
            throw new Error("usuario não encontrado")
        }

        if(user.password !== password) {
            throw new Error("usuario ou senha incorretas")
        }

        
        const { token, options } = cookieToken(user);


        res.cookie('token', token, options).status(200).send({ user });
    } catch (error) {
        return res.status(404).send({error: 'usuario não encontrado'})
    }
}

exports.logout = async(req, res)=>{
try {
    res.clearCookie('token')
    res.json({
        sucess:true
    })
} catch (error) {
    res.json({error: 'erro ao desconectar usuario, confira se você esta logado'})
}
}

exports.getAllUsers = async(req, res)=>{
    try {
        const allUsers = await prisma.user.findMany()

        res.json(allUsers)
    } catch (error) {
        res.json({error: 'Nenhum usuario encontrado'})
    }
}