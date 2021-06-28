const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'events'
  },
  startTime: Date,
  endTime: Date,
  users: [{
    type : mongoose.Schema.Types.ObjectId, ref: 'devs'
  }]
})

const Shift = mongoose.model('shifts', ShiftSchema);
module.exports = Shift;
