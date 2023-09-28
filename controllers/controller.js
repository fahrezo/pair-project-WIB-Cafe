class Controller {
    static home (req,res) {
        res.render('log_in_page')
    }

    static addMenu (req,res) {
        res.render('TAMBAH MENU')
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
    static register (req, res) {
        res.render('register_page')
    }

    static postRegister (req, res) {
        res.send(req.body)
    }
}

module.exports = Controller