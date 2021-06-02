const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  admin: Boolean,
  name: {
    first: String,
    last: String
  },
  email: String,
  phoneNumber: String,
  shifts: [{
    name: String,
    startTime: Date,
    endTime: Date
  }],
  location : String,
  volunteerPreferences : [String],
  status : Boolean
}, {
  versionKey: false
})

const User = mongoose.model('devs', UserSchema);
module.exports = User;