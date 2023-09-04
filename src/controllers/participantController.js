const prisma = require('../config/prisma.js')

exports.createParticipant = async(req, res, next) => {

    try {
        const {firstName, lastName, participation, projectId} = req.body 

        const participant = await prisma.participant.create({
            data:{
                firstName, 
                lastName, 
                participation,
                project:{
                    connect:{
                        id: projectId
                    }
                }
            }
        })

        res.json(participant)
    } catch (error) {
        res.json({error: error})
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

        res.json(updatedParticipant)
    } catch (error) {
        res.json({error: 'participante não encontrado'})
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

        res.json({mensagem: 'participante deletado com sucesso'})
    } catch (error) {
        res.json({error: 'participante não encontrado'})
    }
}

exports.getAllParticipants = async(req, res)=>{
    try {
        const allParticipants = await prisma.participant.findMany()

        res.json(allParticipants)
    } catch (error) {
        res.json({error: 'Nenhum participante encontrado'})
    }
}