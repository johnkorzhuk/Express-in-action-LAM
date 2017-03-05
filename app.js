import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import flash from 'connect-flash'

import routes from './routes'
const app = express()

mongoose.connect('mongodb://localhost:27017/LAMtest')
app.set('port', process.env.PORT || 3000)

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: 'LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.use(routes)
app.listed(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`)
})
