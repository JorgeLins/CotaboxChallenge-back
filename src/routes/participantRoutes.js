const express =require('express')
const router = express.Router()


const {createParticipant, updateParticipant, deleteParticipant, getAllParticipants} = require('../controllers/participantController.js')

router.route('/').post(createParticipant)
router.route('/:id').put(updateParticipant)
router.route('/:id').delete(deleteParticipant)
router.route('/').get(getAllParticipants)

module.exports = router
