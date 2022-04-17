
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

OauthToken:{
    type:String,
},
Name:{
    type:String,
},

email:{
    type:String,
},

picture:{
    type:String,
},

searchHistory:[{
    serach:{type:String},
    timestamp:{type:String},
  }],
  
},{timestamps: true});


module.exports = mongoose.model("user", UserSchema);
