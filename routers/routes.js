const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.home)
router.post('/', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)

module.exports = router