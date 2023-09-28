const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.home)
router.post('/', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
router.get('/register/wallet/:id', Controller.postWallet)
router.get('/admin', Controller.helloAdmin)
router.get('/admin/menu', Controller.restaurantMenu)
router.get('/admin/list', Controller.customerList)
router.get('/admin/order', Controller.orderList)
router.get('/admin/add/menu', Controller.addMenu)
router.post('/admin/add/menu', Controller.addMenu)
router.get('/admin/edit/menu/:id', Controller.addMenu)
router.post('/admin/edit/menu/:id', Controller.addMenu)

module.exports = router