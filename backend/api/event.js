const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const authEndpoint = require('./auth')

router.post('/create', authEndpoint.auth, async (req, res) => {
    if(req.user && req.user.admin) {
        Event.create(
            {
                name: req.body.name, 
                startTime: req.body.startTime, 
                endTime: req.body.endTime, 
                location: req.body.location, 
                description: req.body.description,
                volunteersPerShift: req.body.volunteersPerShift,
                coordinator: req.body.coordinator,
                address: req.body.address,
                volunteerType: req.body.volunteerType
            }, function(err) {
                if(err) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
        });
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