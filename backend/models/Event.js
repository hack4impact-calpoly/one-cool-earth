const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name : String,
  date: Date,
  location : String,
  volunteerPreferences : [String]
}, {
  versionKey: false
})

const Event = mongoose.model('events', EventSchema);
module.exports = Event;