const express = require('express')
const router = express.Router()

// MIDDLEWARES / CONTROLLERS
const authMiddleware = require('../middlewares/auth.middleware')
const bulletsController = require('../controllers/bullets.controller')
const authController = require('../controllers/auth.controller')

// AUTH ROUTES
router.get('/signup', authController.signup)
router.post('/signup', authController.doSignup)
router.get('/login', authController.login)
router.post('/login', authController.doLogin)
router.post('/logout', authController.doLogout)

// BULLETS ROUTES
router.get('/', authMiddleware.isLoggedIn, bulletsController.index)
router.get('/bullets', bulletsController.getAll)
router.get('/bullets/new', authMiddleware.isLoggedIn, bulletsController.new)
router.post('/bullets/new', authMiddleware.isLoggedIn, bulletsController.doNew)
router.get('/bullets/:id/edit', authMiddleware.isLoggedIn, bulletsController.edit)
router.post('/bullets/:id/edit', authMiddleware.isLoggedIn, bulletsController.doEdit)
router.post('/bullets/:id/delete', authMiddleware.isLoggedIn, bulletsController.delete)

// BULLETS VIEWS
router.get('/bullets/:month', authMiddleware.isLoggedIn, bulletsController.getMonth)
router.get('/bullets/:month/weekly', authMiddleware.isLoggedIn, bulletsController.getWeekly)

module.exports = router
