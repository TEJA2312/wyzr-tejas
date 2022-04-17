var mongoose = require('mongoose'); 
require('dotenv').config({ path: './victoria.env' })
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true, useUnifiedTopology: true});

module.exports ={mongoose};