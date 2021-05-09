const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  admin : Boolean,
  name : {
    first : String,
    last : String
  },
  password : String,
  email : String,
  availableDates : [Date],
  location : String,
  volunteerPreferences : [String],
  status : Boolean
}, {
  versionKey: false
})

const User = mongoose.model('devs', UserSchema);
module.exports = User;