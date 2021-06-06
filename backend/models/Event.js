const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name : String,
  startTime: Date,
  endTime: Date,
  location : String,
  description: String,
  volunteersPerShift: Number,
  coordinator: String,
  address: String,
  volunteerType: String,
  status: Boolean
})

const Event = mongoose.model('events', EventSchema);
module.exports = Event;