const express = require('express');

const Event = require('../models/Event');
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

 const deleteEvent = async (eventName) => {



    Event.findOne({name: eventName}).then((data) => {
        if(data)
        {
            Event.deleteOne({ name: eventName }).then(function(){
                console.log("Data deleted"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            }); 
            
        }
    });
};

 router.post('/deleteEvent', async (req, res) => {
    const eventName = req.body.name
    await deleteEvent(eventName);
    res.send("success delete")
 });
 
 module.exports = router;