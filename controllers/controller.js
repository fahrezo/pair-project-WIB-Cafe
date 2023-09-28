class Controller {
    static home (req,res) {
        res.render('log_in_page')
    }

    static register (req, res) {
        res.render('register_page')
    }

    static postRegister (req, res) {
        res.send(req.body)
    }
}

module.exports = Controller