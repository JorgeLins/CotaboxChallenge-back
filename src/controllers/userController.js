const prisma = require('../config/prisma.js')
const cookieToken = require('../utils/cookieToken.js')


exports.signup  = async(req, res, next) => {

    try {
        const {username, email, password, projectName} = req.body


        if(!username || !email || !password || !projectName) {
            return res.status(400).send({ error: "Por favor, preencha todos os campos." });
        }

        const user = await prisma.user.create({
            data:{  
                username,
                email,
                password,
                projectName
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
           return res.status(400).send({ error:"Por favor coloquei o email e a senha."})
        }

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        
        if(!user) {
            return res.status(404).send({error: 'Usuário não encontrado'})
        }

        if(user.password !== password) {
            return  res.status(400).send({error :"Usuário ou senha incorretas"})
        }

        
        const { token, options } = cookieToken(user);


        res.cookie('token', token, options).status(200).send({ user, token });
    } catch (error) {
        return res.status(404).send({error: 'Usuário não encontrado'})
    }
}

exports.logout = async(req, res)=>{
try {
    res.clearCookie('token')
    res.status(200).json({
        sucess:true
    })
} catch (error) {
    return res.status(500).send({ error: "Ocorreu um erro ao processar sua solicitação." });
}
}

exports.getAllUsers = async(req, res)=>{
    try {
        const allUsers = await prisma.user.findMany()

        res.status(200).json(allUsers)
    } catch (error) {
        return res.status(404).send({error: 'Usuário não encontrado'})
    }
}

exports.getOneUser = async(req, res)=>{

    const {id} = req.params;

    try {
        const user = await prisma.user.findUnique({
            where:{
                id: id
            }
        })

        res.status(200).json(user)
    } catch (error) {
        return res.status(404).send({error: 'Usuário não encontrado'})
    }
}