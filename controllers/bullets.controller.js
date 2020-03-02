const Bullet = require('../lib/bullets')
const newBullet = new Bullet()

module.exports.index = (req, res, next) => {
  res.render('index', { layout: 'welcomeLayout' })
}

module.exports.getAll = (req, res, next) => {
  newBullet.getAll(req.user.id)
    .then(bullets => {
      res.render('bullets/index', { bullets })
    })
    .catch(e => next(e))
}

module.exports.getMonth = (req, res, next) => {
  console.log(typeof req.params.month)
  newBullet.getMonth(req.params.month)
    .then(bullets => {
      console.log(bullets)
      res.render('bullets/monthly', { bullets })
    })
    .catch(e => next(e))
}

// CREATE Route
module.exports.new = (req, res, next) => {
  const selectOptions = ['task', 'note', 'event'].map(option => {
    return {
      value: option
    }
  })
  res.render('bullets/new', { selectOptions })
}

module.exports.doNew = (req, res, next) => {
  newBullet.create(req.body, req.user)
    .then(bullet => res.redirect('/bullets'))
    .catch(e => next(e))
}

// EDIT Route
module.exports.edit = (req, res, next) => {
  newBullet.edit(req.params.id)
    .then(values => {
      const bullet = values.bullet
      const selectOptions = values.selectOptions
      const statusOptions = values.statusOptions
      res.render('bullets/edit', { bullet, selectOptions, statusOptions })
    })
    .catch(e => next(e))
}

// POST EDIT ROUTE
module.exports.doEdit = (req, res, next) => {
  newBullet.update(req.params.id, req.body)
    .then(bullet => res.redirect('/bullets'))
    .catch(e => next(e))
}

module.exports.delete = (req, res, next) => {
  console.log(req.params.id)
  newBullet.delete(req.params.id)
    .then(bullet => res.redirect('/bullets'))
    .catch(e => next(e))
}
