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
        console.log(name, email, password, phone, address, role, adminPassword);
        if (adminPassword==="sapilaras") {
            res.send(req.body)
        } else {
            res.send(`Admin Password Salah`)
        }
        // User.create ({name:name, email:email, password:password, phone:phone, address:address})
    }
}

module.exports = Controller