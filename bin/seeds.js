const mongoose = require('mongoose')
const Bullet = require('../models/bullet')

mongoose
  .connect('mongodb://localhost:27017/bullet-journal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => { console.log(`Connected to MongoDB, DB name: ${x.connections[0].name}`) })
  .catch(e => {
    console.log(e)
  })

const bullets = [
  {
    name: 'First Bullet',
    type: 'task',
    status: 'Active',
    date: '2020-02-01T14:32:02.243+00:00'
  },
  {
    name: 'Second Bullet',
    type: 'event',
    status: 'Active',
    date: '2020-02-04T14:32:02.243+00:00'
  },
  {
    name: 'Third Bullet',
    type: 'note',
    status: 'Active',
    date: '2020-02-07T14:32:02.243+00:00'
  },
  {
    name: 'last Bullet',
    type: 'task',
    status: 'Active',
    date: '2020-02-02T14:32:02.243+00:00'
  }
]

Bullet.create(bullets)
  .then(task => {
    console.log('bullets created succesfuly')
  })
  .catch(e => {
    console.log(e)
  })
