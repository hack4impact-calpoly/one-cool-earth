const express = require('express')
const mongoose = require('mongoose');
const User = require('../../models/User');
const router = express.Router();

router.post('/', async(req,res) => {
    email = req.body.email
    eventName = req.body.name;
    startTime = req.body.startTime;
    endTime = req.body.endTime;

    console.log("Email: " + email)
    console.log("Event Name: " + eventName)
    console.log("Start Time: " + startTime)
    console.log("End Time: " + endTime)
    
    User.findOne({email: email}).then(function(user) {
        if(!user){
            console.log("User not found")
        }
        else{
            console.log("User found")
        }
    })

    User.updateOne(
        {email: email},
        {$push: 
            {"shifts":
                {
                    name: eventName,
                    startTime: startTime,
                    endTime: endTime
                }
            }
        },
    )
    
    res.sendStatus(200)
})

module.exports = router;