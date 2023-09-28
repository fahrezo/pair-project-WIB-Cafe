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
                        res.redirect('/admin/menu')
                    } else {
                        res.redirect('Customer Menu')
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
        console.log(req.body);
        const {name, email, password, phone, address, role, adminPassword} = req.body
        if (role === "Admin" && adminPassword !== "sapilaras") {
            res.send(`Admin Password Salah`)
        } else {
            User.create({name, email, password, phone, address, role})
                .then((users) => {
                    console.log(users)
                    res.redirect('/')
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

    static addMenu (req,res) {
        // res.render('TAMBAH MENU')
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

    static restaurantMenu (req, res) {
        res.render('admin_menu')
    }

    static customerList (req, res) {
        res.render('admin_customer_list')
    }

    static orderList (req, res) {
        res.render('admin_order')
    }

    //ini comment
}

module.exports = Controller