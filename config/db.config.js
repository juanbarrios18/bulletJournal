const mongoose = require('mongoose')
require('dotenv').config()

//const mongodbConnection = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/bullet-journal' : process.env.MONGODB_URI

mongoose
  .connect("mongodb+srv://mongodbuser:bulletjournal1234567@bulletjournal-js68h.mongodb.net/bulletjournal?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => { console.log(`Connected to MongoDB, DB name: ${x.connections[0].name}`) })
  .catch(e => {
    console.log(e)
  })
  