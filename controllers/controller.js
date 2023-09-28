const { Menu, User, Wallet, Order } = require ('../models')

class Controller {
    static home (req,res) {
        res.render('log_in_page')
    }

    static postLogin (req, res) {
        const {email, password} = req.body

        User.findOne({
            where: { email: email, password: password}
        })
            .then((result) => {
                if (!result) {
                    res.redirect('/')
                } else {
                    if (result.role === "Admin") {
                        res.redirect('/admin')
                    } else {
                        res.redirect(`/customer/${result.id}`)
                    }
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static register (req, res) {
        res.render('register_page')
    }

    static postRegister (req, res) {
        const {name, email, password, phone, address, role, adminPassword} = req.body
        if (role === "Admin" && adminPassword !== "sapilaras") {
            res.send(`Admin Password Salah`)
        } else {
            User.create({name, email, password, phone, address, role})
                .then((users) => {
                    // res.send(users)
                    res.redirect(`/register/wallet/${users.id}`)
                })
                .catch((err) => { 
                    if (err.name == 'SequelizeValidationError') {
                        const messages = err.errors.map((el) => el.message)
                        res.send(messages)
                    } else {
                        res.send(err)
                    }
                })
        }
    }

    static postWallet (req, res) {
        const {id} = req.params
        Wallet.create({UserId: id})
            .then((result) => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addMenu (req,res) {
        res.render('form_add_menu')
    }

    static createMenu (req,res) {
        const {name, price, category, description} = req.body
        Menu.create({name, price, category, description})
            .then((menu) => {
                console.log(menu);
                res.redirect(`/MENU UTAMA`)
            })
            .catch((err) => { 
                if (err.name == 'SequelizeValidationError') {
                    const messages = err.errors.map((el) => el.message)
                    res.send(messages)
                } else {
                    res.send(err)
                }
            })
    } 

    static helloAdmin (req, res) {
        res.render('admin_homepage')
    }

    static helloCustomer (req, res) {
        const {id} = req.params
        res.render('customer_homepage', {id})
    }

    static restaurantMenu (req, res) {
        Menu.findAll()
            .then((menus) => {
                res.render('admin_menu', {menus})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static customerList (req, res) {
        User.findAll({
            where: { role: 'Customer' },
            include: { model: Wallet }
        })
            .then((users) => {
                res.render('admin_customer_list', {users})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static orderList (req, res) {
        Order.findAll({
            include: { model: User }
        })
        .then((orders) => {
            res.render('admin_order', {orders})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static customerDetail (req, res) {
        res.render('admin_customer_detail')
    }
    
    static customerMenu (req, res) {
        const {id} = req.params
        console.log(id);
        Menu.findAll()
        .then((menus) => {
            res.render('customer_menu', {menus, id})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static customerOrder (req, res) {
        const {id, MenuId} = req.params
        const {price, amount} = req.body

        const total = amount * price

        Order.create({MenuId, UserId:id, amount, totalprice: total})
            .then((result) => {
                res.redirect(`/customer/${id}/menu`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static customerOrderList (req, res) {
        const {id} = req.params
        Order.findAll({
            where: { UserId: id},
            include: { model: Menu }
        })
        .then((orders) => {
            res.render('customer_order', {orders, id})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static logout (req, res) {
        res.redirect('/')
    }
}

module.exports = Controller