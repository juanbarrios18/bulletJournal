const mongoose = require('mongoose')

const schemaDate = new mongoose.Schema({
  date: Date,
  day: Number,
  month: Number,
  week: Number,
  year: Number
})

const bulletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: String,
  status: String,
  date: schemaDate,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Bullet = mongoose.model('Bullet', bulletSchema)

module.exports = Bullet
