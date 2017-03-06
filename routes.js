const express = require('express')

const User = require('./models/user')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.errors = req.flash('error')
  res.locals.infos = req.flash('info')
  next()
})

router.get('/', (req, res, next) => {
  User.find()
    .sort({ createdAt: 'descending' })
    .then((users) => {
      res.render('index', { users })
    })
    .catch(next)
})

module.exports = router
