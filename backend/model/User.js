const mongoose = require('mongoose');
const dataBase = require('./database/database.js') 

const UserSchema = new mongoose.Schema({
  admin : Boolean,
  name : {
    first : String,
    last : String
  },
  password : String,
  email : String,
  availableDates : [{
    date : {
      month : Number,
      day : Number,
      year: Number
    }
  }],
  location : String,
  volunteerPreferences : [String]
})

const User = mongoose.model('User', UserSchema);
module.exports = User;