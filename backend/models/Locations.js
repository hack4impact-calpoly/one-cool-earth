const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: String
})

const Location = mongoose.model('locations', LocationSchema);
module.exports = Location;