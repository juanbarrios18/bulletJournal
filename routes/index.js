var express = require('express')
var router = express.Router()

// INDEX Route
router.get('/', function (req, res, next) {
  res.render('index', { layout: 'WelcomeLayout', title: 'Bullet Journal' })
})

router.get('/test', (req, res) => {
  return res.render('test', {
    saludo: 'Hola!',
    name: 'Juan'
  })
})

module.exports = router
