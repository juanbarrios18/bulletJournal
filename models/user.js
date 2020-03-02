const mongoose = require('mongoose')
const localMongoose = require('passport-local-mongoose')
const Bullet = require('../models/bullet')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
})
userSchema.plugin(localMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User
