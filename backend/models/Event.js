const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name : String,
  date: Date,
  startTime: Date,
  endTime: Date,
  location : String,
  description: String,
  numberOfVolunteers: Number,
  coordinator: String,
  address: String,
  volunteerType: String,
  active: Boolean,
  users: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const Event = mongoose.model('events', EventSchema);
module.exports = Event;
