const { Menu, Order, User, Wallet } = require('../models')

class Controller {
    static home (req,res) {
        res.render('log_in_page')
    }

    static register (req, res) {
        res.render('register_page')
    }

    static postRegister (req, res) {
        const {name, email, password, phone, address } = req.body
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
}

module.exports = Controller