const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
// const isLoggedin = (req, res, next) => {
//     if (req.session.userId) {
//       next();
//     } else {
//       const error = "Login first to access isWatch";
//       res.redirect(`/?error=${error}`);
//     }
//   };

router.get('/', Controller.home)
router.post('/', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)

// router.use(isLoggedin)

router.get('/customer/:id', Controller.helloCustomer)
router.get('/customer/:id/menu', Controller.customerMenu)
router.post('/customer/:id/menu/:MenuId', Controller.customerOrder)
router.get('/customer/:id/order', Controller.customerOrderList)
router.get('/admin', Controller.helloAdmin)
router.get('/admin/menu', Controller.restaurantMenu)
router.get('/admin/list', Controller.customerList)
router.get('/admin/order', Controller.orderList)
router.get('/admin/add/menu', Controller.addMenu)
router.post('/admin/add/menu', Controller.createMenu)
router.get('/register/wallet/:id', Controller.postWallet)
router.get('/admin/list/detail/:id', Controller.customerDetail)
router.post('/admin/list/detail/:id', Controller.customerTopUp)
router.get('/admin/edit/menu/:id', Controller.editMenu)
router.post('/admin/edit/menu/:id', Controller.postEditMenu)
router.get('/order/delete/:id', Controller.deleteOrder)
router.get('/menu/delete/:id', Controller.deleteMenu)

router.get('/logout', Controller.logout)

module.exports = router