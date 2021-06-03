const express = require('express');
const Shift = require('../models/Shift');
const router = express.Router();
const authEndpoint = require('./auth');

router.post('/create', authEndpoint.auth, async (req, res) => {
    if(req.user && req.user.admin) {
        Shift.create(
            {
                eventID: req.body.eventId,
                startTime: req.body.startTime, 
                endTime: req.body.endTime, 
                users: []
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


router.get('/getShift', authEndpoint.auth, async (req, res) => {
    if(req.user) {
       Shift.findById(req.query.id, function (err, shift) {
           if(err) {
               res.sendStatus(500);
           } else {
               res.status(200).json({shift: shift});
           }
       });
    } else {
        res.sendStatus(403);
    }
})

router.post('/deleteShift', authEndpoint.auth, async (req, res) => { 
    if(req.user && req.user.admin) {
        Shift.findByIdAndDelete(req.body.id, function (err) {
            if(err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(403)
    }
})

module.exports = router;