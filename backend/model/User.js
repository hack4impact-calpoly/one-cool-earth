const mongoose = require('mongoose');
const dataBase = require('./database/database.js') 

const UserSchema = new mongoose.Schema({
  "Admin": Boolean,
  "Name": {
    "First": String,
    "Last": String
  },
  "Password": String,
  "Email": String,
  "AvailableDates": [{
    "Date": {
      "Month": Number,
      "Day": Number,
      "Year": Number
    }
  }],
  "Location": String,
  "VolunteerPreferences": [String]
})

const User = mongoose.model('User', UserSchema);
module.exports = User;