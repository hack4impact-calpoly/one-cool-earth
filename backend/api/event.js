const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const authEndpoint = require('./auth')

const editEvent = async (id, name, date, startTime, endTime, location, description, numberOfVolunteers, coordinator, address, volunteerType) => {
    await Event.findById(id).then(function(event) {
        if (name) {
            event.name = name
        }
        if (date) {
            event.date = date
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
        if (numberOfVolunteers) {
            event.numberOfVolunteers = numberOfVolunteers
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

router.post('/create', authEndpoint.auth, async (req, res) => {
    if(req.user && req.user.admin) {
        Event.create(
            {
                name: req.body.name,
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                location: req.body.location,
                description: req.body.description,
                numberOfVolunteers: req.body.numberOfVolunteers,
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

router.post('/edit', authEndpoint.auth, async (req, res) => {
    if (req.user && req.user.admin) {
        const _id = req.body._id
        const name = req.body.name
        const date = req.body.date
        const startTime = req.body.startTime
        const endTime = req.body.endTime
        const location = req.body.location
        const description = req.body.description
        const numberOfVolunteers = req.body.numberOfVolunteers
        const coordinator = req.body.coordinator
        const address = req.body.address
        const volunteerType = req.body.volunteerType
        await editEvent(_id, name, date, startTime, endTime, location, description, numberOfVolunteers, coordinator, address, volunteerType)
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
});

 router.get('/get', authEndpoint.auth, async (req, res) => {
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


 router.post('/delete', authEndpoint.auth, async (req, res) => {
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
