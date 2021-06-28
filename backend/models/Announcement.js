const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Announcement = mongoose.model('announcements', AnnouncementSchema);
module.exports = Announcement;
