const BulletModel = require('../models/bullet')
const moment = require('moment')

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

class Bullet {
  getAll () {
    return new Promise((resolve, reject) => {
      BulletModel.find()
        .then(bullets => resolve(bullets))
        .catch(err => reject(err))
    })
  }

  getOne (id) {
    return new Promise((resolve, reject) => {
      BulletModel.findById({ _id: id })
        .then(bullet => resolve(bullet))
        .catch(err => reject(err))
    })
  }

  getMonth (month) {
    return new Promise((resolve, reject) => {
      BulletModel.find({ month: month })
        .then(bullets => {
          resolve(bullets)
        })
        .catch(err => reject(err))
    })
  }

  getWeekly (month) {
    return new Promise((resolve, reject) => {
      BulletModel.find({ month: month }).sort({ week: 'asc' })
        .then(bullets => {
          const groupByWeek = groupBy('week')
          const bulletsGroup = groupByWeek(bullets)
          console.log(bulletsGroup)
          resolve(bulletsGroup)
        })
        .catch(e => reject(e))
    })
  }

  create (data, user) {
    return new Promise((resolve, reject) => {
      const newBullet = new BulletModel({
        name: data.name,
        type: data.type,
        status: 'active',
        userId: user._id,
        date: data.date,
        day: moment(data.date).get('day'),
        week: moment(data.date).get('week'),
        month: (moment(data.date).get('month')) + 1,
        year: moment(data.date).get('year')
      })
      newBullet.save()
        .then(bullet => resolve(bullet))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      BulletModel.findByIdAndDelete({ _id: id })
        .then(bullet => resolve(bullet))
        .catch(err => reject(err))
    })
  }

  update (id, data) {
    return new Promise((resolve, reject) => {
      BulletModel.findByIdAndUpdate(id, { name: data.name, type: data.type, status: data.status, date: { date: new Date(data.date) } })
        .then(bullet => resolve(bullet))
        .catch(err => reject(err))
    })
  }

  edit (id) {
    return new Promise((resolve, reject) => {
      BulletModel.findById({ _id: id })
        .then(data => {
          const bullet = ({
            id: data.id.toString(),
            date: data.date.date.toISOString().split('T')[0],
            type: data.type,
            name: data.name,
            status: data.status
          })
          const selectOptions = ['task', 'note', 'event'].map(option => {
            return {
              value: option,
              selected: option === bullet.type
            }
          })
          const statusOptions = ['active', 'completed', 'migrated', 'futureLog', 'inactive'].map(status => {
            return {
              value: status,
              selected: status === bullet.status
            }
          })
          resolve({ bullet, selectOptions, statusOptions })
        })
        .catch(err => reject(err))
    })
  }
}

module.exports = Bullet
