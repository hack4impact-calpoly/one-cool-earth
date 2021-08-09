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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events'
  }],
  location : String,
  volunteerPreferences : [String],
  active : Boolean,
  signedWaiver: Boolean
})

const User = mongoose.model('users', UserSchema);
module.exports = User;
