const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: String,
    description: String,
}, {
    versionKey: false
});

const Announcement = mongoose.model('announcements', AnnouncementSchema);
module.exports = Announcement;