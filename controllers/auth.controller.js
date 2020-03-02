const User = require('../models/user')
const passport = require('passport')

// SIGNUP
module.exports.signup = (req, res, next) => {
  res.render('users/signup', { layout: 'welcomeLayout' })
}

module.exports.doSignup = (req, res, next) => {
  console.log('signup req.body: ' + req.body.username)
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      return res.render('/users/signup', { layout: 'welcomeLayout' })
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/bullets')
    })
  })
}

// LOGIN
module.exports.login = (req, res, next) => {
  res.render('users/login', { layout: 'welcomeLayout' })
}

module.exports.doLogin = passport.authenticate('local', {
  successRedirect: '/bullets',
  failureRedirect: '/users/login'
})

module.exports.doLogin = passport.authenticate('local', {
  successRedirect: '/bullets',
  failureRedirect: '/users/login'
})

// LOGOUT
module.exports.doLogout = (req, res, next) => {
  req.logout()
  res.redirect('/users/login')
}
