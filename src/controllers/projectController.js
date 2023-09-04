const prisma = require('../config/prisma.js')

exports.createProject = async(req, res, next) => {

    try {
        const {title, subtitle, ownerId} = req.body 

        const project = await prisma.project.create({
            data:{
                title, 
                subtitle, 
                owner:{
                    connect:{
                        id: ownerId
                    }
                }
            }
        })

        res.json(project)
    } catch (error) {
        throw new Error(error)
    }

}

exports.updateProject = async(req, res, next) => {
    const {id} = req.params;

    const {title, subtitle} = req.body

    try {
        const updatedProject = await prisma.project.update({
            where:{
                id: id
            },
            data:{
                title: title,
                subtitle: subtitle
            }
        })

        res.json(updatedProject)
    } catch (error) {
        res.json({error: 'Projeto não encontrado'})
    }

 
}

exports.deleteProject = async(req, res, next) =>{
    const {id} = req.params;

    try {
        const deletedProject = await prisma.project.delete({
            where:{
                id: id
            }
        })

        res.json({mensagem: 'Projeto deletado com sucesso'})
    } catch (error) {
        res.json({error: 'Projeto não encontrado'})
    }
}

exports.getAllProjects = async(req, res)=>{
    try {
        const allProjects = await prisma.project.findMany()

        res.json(allProjects)
    } catch (error) {
        res.json({error: 'Nenhum projeto encontrado'})
    }
}