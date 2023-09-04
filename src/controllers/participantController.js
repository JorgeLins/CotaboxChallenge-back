const prisma = require('../config/prisma.js')

exports.createParticipant = async(req, res, next) => {

    try {
        const {firstName, lastName, participation, ownerId} = req.body 

        if(!firstName || !lastName || !participation) {
            return res.status(400).send({ error: "Por favor, preencha todos os campos." });
        }


        const participant = await prisma.participant.create({
            data:{
                firstName, 
                lastName, 
                participation,
                owner:{
                    connect:{
                        id: ownerId
                    }
                }
            }
        })

        res.status(200).json(participant)
    } catch (error) {
        return res.status(500).send({ error: "Ocorreu um erro ao processar sua solicitação. Verifique o serviço" });
    }

}

exports.updateParticipant = async(req, res, next) => {
    const {id} = req.params;

    const {firstName, lastName, participation} = req.body

    try {
        const updatedParticipant = await prisma.participant.update({
            where:{
                id: id
            },
            data:{
                firstName: firstName,
                lastName: lastName,
                participation:participation
            }
        })

        res.status(200).json(updatedParticipant)
    } catch (error) {
       return res.status(404).json({error: 'Particiante não encontrado'})
    }

 
}

exports.deleteParticipant = async(req, res, next) =>{
    const {id} = req.params;

    try {
        const deletedParticipant = await prisma.participant.delete({
            where:{
                id: id
            }
        })

        res.status(200).json({mensagem: 'Particiante deletado com sucesso'})
    } catch (error) {
       return res.status(404).json({error: 'Particiante não encontrado'})
    }
}

exports.getParticipantsByProject = async(req, res)=>{

    const {id} = req.params;

    try {
        const allParticipants = await prisma.participant.findMany({
            where:{
                ownerId: id
            }
        })

        res.status(200).json(allParticipants)
    } catch (error) {
       return res.status(404).json({error: 'Nenhum Particiante encontrado'})
    }
}

exports.getAllParticipants = async(req, res)=>{
    try {
        const allParticipants = await prisma.participant.findMany()

        res.status(200).json(allParticipants)
    } catch (error) {
       return res.status(404).json({error: 'Nenhum Particiante encontrado'})
    }
}