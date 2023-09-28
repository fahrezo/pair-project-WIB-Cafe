// const {User} = require ('../models')

class Controller {
    static home (req,res) {
        res.render('log_in_page')
    }

    static register (req, res) {
        res.render('register_page')
    }

    static postRegister (req, res) {
        const {name, email, password, phone, address, role, adminPassword} = req.body
        if (role === "Admin" && adminPassword!== 'sapilaras') {
            res.redirect('/register')
        } else {
            res.redirect('/')
        }
    }
}

module.exports = Controller