const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.home)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)

module.exports = router