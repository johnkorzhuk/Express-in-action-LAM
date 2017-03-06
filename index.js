const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

const routes = require('./routes')
const app = express()

mongoose.connect('mongodb://localhost:27017/LAMtest')
app.set('port', process.env.PORT || 3000)

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: 'LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.use(routes)
app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`)
})
