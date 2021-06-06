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

const editEvent = async (id, name, startTime, endTime, location, description, volunteersPerShift, coordinator, address, volunteerType) => {
    await Event.findOneAndUpdate({"id": id}).then(function(event) {
        if (name) {
            event.name = name
        }
        if (startTime) {
            event.startTime = startTime
        }
        if (endTime) {
            event.endTime = endTime
        }
        if (location) {
            event.location = location
        }
        if (description) {
            event.description = description
        }
        if (volunteersPerShift) {
            event.volunteersPerShift = volunteersPerShift
        }
        if (coordinator) {
            event.coordinator = coordinator
        }
        if (address) {
            event.address = address
        }
        if (volunteerType) {
            event.volunteerType = volunteerType
        }
        event.save()
    });
};

router.post('/editEvent', authEndpoint.auth, async (req, res) => {
    if (req.user && req.user.admin) {
        id = req.body.id
        name = req.body.name
        startTime = req.body.startTime
        endTime = req.body.endTime
        location = req.body.location
        description = req.body.description
        volunteersPerShift = req.body.volunteersPerShift
        coordinator = req.body.coordinator
        address = req.body.address
        volunteerType = req.body.volunteerType
        await editEvent(id, name, startTime, endTime, location, description, volunteersPerShift, coordinator, address, volunteerType)
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
});

 router.get('/getEvent', authEndpoint.auth, async (req, res) => {
     if(req.user) {
        Event.findById(req.query.id, function (err, event) {
            if(err) {
                res.sendStatus(500);
            } else {
                res.status(200).json({event: event});
            }
        });
     } else {
         res.sendStatus(403);
     }
 })


 router.post('/deleteEvent', authEndpoint.auth, async (req, res) => { 
    if(req.user && req.user.admin) {
        Event.findByIdAndDelete(req.body.id, function (err) {
            if(err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
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