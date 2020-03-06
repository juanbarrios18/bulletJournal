const mongoose = require('mongoose')

const bulletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: String,
  status: String,
  date: Date,
  day: Number,
  month: Number,
  week: Number,
  year: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Bullet = mongoose.model('Bullet', bulletSchema)

module.exports = Bullet
