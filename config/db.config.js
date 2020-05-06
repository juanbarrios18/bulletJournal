const mongoose = require('mongoose')
require('dotenv').config()

const mongodbConnection = (process.env.NODE_ENV === 'dev') ? "mongodb+srv://mongodbuser:bulletjournal1234567@bulletjournal-js68h.mongodb.net/bulletjournal?retryWrites=true&w=majority" : process.env.MONGODB_URI

mongoose
  .connect(mongodbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => { console.log(`Connected to MongoDB, DB name: ${x.connections[0].name}`) })
  .catch(e => {
    console.log(e)
  })
  