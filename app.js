const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/routes')
const session = require('express-session')

app.set('view engine', 'ejs')
app.set('views')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
// app.use(session({
//     secret: 'rahasia',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { 
//       secure: false,
//       sameSite: true //for secure from csrf attack
//     }
// }))

app.use(router)

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})