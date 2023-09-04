const express =require('express')
const router = express.Router()


const {createParticipant, updateParticipant, deleteParticipant, getAllParticipants, getParticipantsByProject} = require('../controllers/participantController.js')

router.route('/').post(createParticipant)
router.route('/:id').put(updateParticipant)
router.route('/:id').delete(deleteParticipant)
router.route('/').get(getAllParticipants)
router.route('/:id').get(getParticipantsByProject)

module.exports = router
