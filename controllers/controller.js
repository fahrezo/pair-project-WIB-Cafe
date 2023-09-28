const { Menu, User, Wallet, Order } = require ('../models')
const bcrypt = require('bcrypt')

class Controller {
    static home (req,res) {
        const {errors} = req.query
        res.render('log_in_page', {errors})
    }

    static postLogin (req, res) {
        const {email, password} = req.body
        if(!email) {
            const error = "Please insert your email"
            return res.redirect(`/?errors=${error}`)
        }
        User.findOne({
            where: { email: email}
        })
            .then((result) => {
                if (!result) {
                    const error = "Email not registered"
                    return res.redirect(`/?errors=${error}`)
                } else {
                    const validatePassword = bcrypt.compareSync(password, result.password)

                    if(!validatePassword) {
                        const error = "Password is incorrect"
                        return res.redirect(`/?errors=${error}`)
                    } else {
                        if (result.role === "Admin") {
                            res.redirect('/admin')
                        } else {
                            res.redirect(`/customer/${result.id}`)
                        }
                    }
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static register (req, res) {
        const {errors} = req.query
        res.render('register_page', {errors})
    }

    static postRegister (req, res) {
        const {name, email, password, phone, address, role, adminPassword} = req.body
        if (role === "Admin" && adminPassword !== "sapilaras") {
            const errors = 'Admin Password Incorrect!'
            return res.redirect(`/register?errors=${errors}`)
        } else {
            User.create({name, email, password, phone, address, role})
                .then((users) => {
                    // res.send(users)
                    res.redirect(`/register/wallet/${users.id}`)
                })
                .catch((err) => { 
                    if (err.name == 'SequelizeValidationError') {
                        const errors = err.errors.map((el) => ' '+el.message)
                        // res.send(messages)
                        return res.redirect(`/register?errors=${errors}`)
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
        res.render('admin_order')
    }

    static customerDetail (req, res) {
        res.render('admin_customer_detail')
    }
    
    static customerMenu (req, res) {
        const {id} = req.params
        const {errors} = req.query
        console.log(id);
        Menu.findAll()
        .then((menus) => {
            res.render('customer_menu', {menus, id, errors})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static customerOrder (req, res) {
        // res.send(`oke`)
        console.log(req.params, req.body);
        const {id, MenuId} = req.params
        const {price, amount} = req.body

        const total = amount * price

        Order.create({MenuId, UserId:id, amount, totalprice: total})
            .then((result) => {
                console.log(id);
                console.log(req.params.id);
                res.redirect(`/customer/${id}/menu`)
            })
            .catch((err) => {
                if (err.name == 'SequelizeValidationError') {
                    const errors = err.errors.map((el) => el.message)
                    // res.send(messages)
                    return res.redirect(`/customer/${id}/menu?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static customerOrderList (req, res) {
        const {id} = req.params
        Order.findAll({
            where: { UserId: id},
            include: { model: Menu }
        })
        .then((orders) => {
            res.send(orders)
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