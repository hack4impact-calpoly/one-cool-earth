const express = require('express')
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router;

router.delete('/', async(req, res) => {
    email = req.body.email;
    eventName = req.body.name;
    startTime = req.body.startTime;
    endTime = req.body.endTime;

    shiftToDelete = await User.findOne({"email": email, 
                                        "shifts": {$elemMatch:{
                                                "name": eventName,
                                                "startTime": startTime,
                                                "endTime": endTime}}});
    
    console.log(shiftToDelete);
    if(shiftToDelete){

    }
    else{
        console.log("Shift not found")
    }
})

module.exports = router;