const express =require('express')
const router = express.Router()

const isLoggedIn = require("../middleware/isLoggedIn.js") 

const {createProject, updateProject, deleteProject, getAllProjects} = require('../controllers/projectController.js')

router.route('/').post(isLoggedIn, createProject)
router.route('/:id').put(isLoggedIn, updateProject)
router.route('/delete/:id').delete(isLoggedIn, deleteProject)
router.route('/').get(isLoggedIn, getAllProjects)

module.exports = router
