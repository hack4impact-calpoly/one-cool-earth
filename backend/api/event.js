const express = require('express');

const Event = require('../models/Event');
const router = express.Router();

const editEvent = async (name, date, location, volunteerPreferences) => {
    Event.findOne({"name": name}).then(function(event) {
        if (name) {
           event.name = name.first
        }
        if (date) {
           event.date = date
        }
        if (location) {
           event.location = location
        }
        if (volunteerPreferences) {
           event.volunteerPreferences = volunteerPreferences
        }
        event.save()
      });
};

router.post('/create', async (req, res) => {
    name = req.body.name
    date = req.body.date
    location = req.body.location
    volunteerPreferences = req.body.volunteerPreferences
    await editEvent(name, date, location, volunteerPreferences)
    res.send("success")
 });
 
 module.exports = router;