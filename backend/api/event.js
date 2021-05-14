const express = require('express');

const Event = require('../models/Event');
//const User = require('../models/User');
const router = express.Router();

const createEvent = async (eventName, eventDate, eventLocation, eventVolunteerPreferences) => {
    Event.findOne({name: eventName}).then((data) => {
        if(!data)
        {
            const event = Event.create(
            {
                name: eventName, 
                date: eventDate, 
                location: eventLocation, 
                volunteerPreferences: 
                eventVolunteerPreferences
            });
        }
    });
};

router.post('/create', async (req, res) => {
    const eventName = req.body.name
    const date = req.body.date
    const location = req.body.location
    const volunteerPreferences = req.body.volunteerPreferences
    await createEvent(eventName, date, location, volunteerPreferences)
    res.send("success")
 });

 const deleteEvent = async (eventName, eventDate, eventLocation, eventVolunteerPreferences) => {
    Event.findOne({name: eventName}).then((data) => {
        if(data)
        {
            Event.deleteOne({name: eventName})
        }
        else
        {
            res.send("Couldn't find event")
        }
    });
};



 router.post('/editEvent', async (req, res) => {
    if (req.user.admin)
    {
        const eventName = req.body.name
        const date = req.body.date
        const location = req.body.location
        const volunteerPreferences = req.body.volunteerPreferences
        await deleteEvent(eventName);
        res.send("success")
    }
    else {
        res.send("You must be an admin to delete event")
     }
 });
 
 module.exports = router;