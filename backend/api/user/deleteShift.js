const express = require('express')
const mongoose = require('mongoose');
const User = require('../../models/User');
const router = express.Router();

router.delete('/', async(req, res) => {
    email = req.body.email;
    eventName = req.body.name;
    startTime = req.body.startTime;
    endTime = req.body.endTime;

    await User.findOneAndUpdate(
        {email: email},
        {$pull: 
            {shifts:{
                name: eventName,
                startTime: startTime,
                endTime: endTime,
            }}
        }
    )

    res.sendStatus(200);
})

module.exports = router;