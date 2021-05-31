const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const authEndpoint = require('./auth')

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

router.post('/create', authEndpoint.auth, async (req, res) => {
    if(req.user && req.user.admin) {
        const eventName = req.body.name
        const date = req.body.date
        const location = req.body.location
        const volunteerPreferences = req.body.volunteerPreferences
        await createEvent(eventName, date, location, volunteerPreferences)
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
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

 router.post('/deleteEvent', authEndpoint.auth, async (req, res) => { 
    if(req.user && req.user.admin) {
        const eventName = req.body.name
        await deleteEvent(eventName);
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
 });
 
 router.get('/get-all', authEndpoint.auth, async(req, res) =>{
    if(req.user) {
        Event.find({}).then(events => {
            res.status(200)
            res.json(events)
        })
    } else {
        res.sendStatus(403)
    }
})
 module.exports = router;