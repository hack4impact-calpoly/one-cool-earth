const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name : String, // file name
  description: String, // maybe? 
  active: Boolean,
  file: {
    data: Buffer, 
    contentType: String
  }
})

const File = mongoose.model('files', FileSchema);
module.exports = File;