const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

// =============
// SIGNUP
// =============
router.get('/signup', (req, res, next) => {
  res.render('users/signup', { layout: 'welcomeLayout' })
})

router.post('/signup', (req, res, next) => {
  console.log('signup req.body: ' + req.body.username)
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      return res.render('/signup', { layout: 'welcomeLayout' })
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/bullets')
    })
  })
})

// =============
// LOGIN
// =============
router.get('/login', function (req, res, next) {
  res.render('users/login', { layout: 'welcomeLayout' })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/bullets',
  failureRedirect: '/users/login'
}))

// =============
// LOGOUT
// =============
router.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
