// VARIABLES
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const hbs = require('hbs')
const passport = require('passport')
const PassportLocal = require('passport-local')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const bulletsRouter = require('./routes/bullets')
const User = require('./models/user')
const app = express()
const authMiddleware = require('./middlewares/auth.middleware')
require('./config/db.config')

// =====================
//  SERVER CONFIGURATION
// =====================

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))

// AUTHENTICATION
app.use(require('express-session')({
  secret: 'Secret message from express session',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new PassportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// GLOBAL USER
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

// ROUTES
//app.use('/', indexRouter)
//app.use('/users', usersRouter)
//app.use('/bullets', authMiddleware.isLoggedIn, bulletsRouter)
const router = require('./config/routes')
app.use('/', router)

// =====================
//    ERROR HANDLER
// =====================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', { layout: false })
})

module.exports = app
