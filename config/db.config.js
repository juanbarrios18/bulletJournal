const mongoose = require('mongoose')
require('dotenv').config()

//const mongodbConnection = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/bullet-journal' : process.env.MONGODB_URI

mongoose
  .connect('mongodb://localhost:27017/bullet-journal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => { console.log(`Connected to MongoDB, DB name: ${x.connections[0].name}`) })
  .catch(e => {
    console.log(e)
  })
