const express = require('express')
const router = express.Router()
const Bullet = require('../models/bullet')

// =============
// INDEX Route
// =============
router.get('/', (req, res) => {
  res.render('index')
})


router.get('/all', (req, res) => {
  Bullet.find({ userId: req.user._id })
    .then(bullets => {
      res.render('bullets/index', { bullets })
    })
    .catch(e => {
      console.log(e)
    })
})
// =============
// CREATE Route
// =============
router.get('/new', (req, res) => {
  const selectOptions = [{ value: 'task' }, { value: 'note' }, { value: 'event' }]
  res.render('bullets/new', { selectOptions })
})

router.post('/new', (req, res) => {
  const newBullet = new Bullet({
    name: req.body.name,
    type: req.body.type,
    status: 'active',
    userId: req.user._id,
    date: req.body.date
  })
  newBullet.save()
    .then(bullet => {
      console.log(`Bullet ${bullet.name} created`)
      res.redirect('/bullets')
    })
    .catch(e => {
      console.log(e)
    })
})

// =============
// EDIT Route
// =============
router.get('/:id/edit', (req, res) => {
  Bullet.findById({ _id: req.params.id })
    .then(bullet => {
      const editedBullet = ({
        id: bullet.id.toString(),
        date: bullet.date.toISOString().split('T')[0],
        type: bullet.type,
        name: bullet.name,
        status: bullet.status
      })
      console.log(typeof editedBullet.id)
      const selectOptions = ['task', 'note', 'event'].map(o => {
        return {
          value: o,
          selected: o === editedBullet.type
        }
      })

      const statusOptions = ['active', 'completed', 'migrated', 'futureLog', 'inactive'].map(o => {
        return {
          value: o,
          selected: o === editedBullet.status
        }
      })

      res.render('bullets/edit', { editedBullet, selectOptions, statusOptions })
    })
})

router.post('/:id/edit', (req, res) => {
  Bullet.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(bullet => {
      console.log('bullet updated')
      res.redirect('/bullets')
    })
    .catch(e => {
      console.log(e)
    })
})

// =============
// DELETE Route
// =============
router.post('/:id/delete', (req, res) => {
  Bullet.findByIdAndDelete({ _id: req.params.id })
    .then(bullet => {
      console.log(`Bullet ${bullet.name} deleted`)
      res.redirect('/bullets')
    })
    .catch(e => {
      console.log(e)
    })
})

module.exports = router
