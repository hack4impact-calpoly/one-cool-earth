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
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events'
    },
    startTime: Date,
    endTime: Date
  }],
  location : String,
  volunteerPreferences : [String],
  active : Boolean
})

const User = mongoose.model('devs', UserSchema);
module.exports = User;
