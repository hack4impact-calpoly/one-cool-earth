const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authEndpoint = require('./auth')

const editUser = async (email, name, availableDates, location, volunteerPreferences) => {
    await User.findOne({"email": email}).then(function(user) {
      if (name.first) {
         user.name.first = name.first
      }
      if (name.last) {
         user.name.last = name.last
      }
      if (availableDates) {
         user.availableDates = availableDates
      }
      if (location) {
         user.location = location
      }
      if (volunteerPreferences) {
         user.volunteerPreferences = volunteerPreferences
      }
      user.save()
    });
};

router.post('/edit', authEndpoint.auth, async (req, res) => {
   if (req.user.email === req.body.email) {
      email = req.body.email
      name = req.body.name
      availableDates = req.body.availableDates
      location = req.body.location
      volunteerPreferences = req.body.volunteerPreferences
      console.log(req.body)
      await editUser(email, name, availableDates, location, volunteerPreferences)
      res.sendStatus(200)
   } else {
      res.sendStatus(403)
   }
});

router.get('/get/:email', authEndpoint.auth, async (req, res) => {
   if(req.user.email === req.params.email) {
      let email = req.params.email
      User.findOne({"email": email}).then(function(user) {
         if (user) {
            res.send(user)
         }
      })
   } else {
      res.sendStatus(403)
   }
});

router.post('/add-shift', authEndpoint.auth, async(req,res) => {
   if(req.user.email === req.params.email) {
      email = req.body.email
      eventName = req.body.name;
      startTime = req.body.startTime;
      endTime = req.body.endTime;

      console.log("Email: " + email)
      console.log("Event Name: " + eventName)
      console.log("Start Time: " + startTime)
      console.log("End Time: " + endTime)

      await User.findOneAndUpdate(
         {email: email},
         {$push: 
            {shifts:
                  {
                     name: eventName,
                     startTime: startTime,
                     endTime: endTime
                  }
            }
         },
      )
      
      res.sendStatus(200)
   } else {
      res.sendStatus(403)
   }
})

router.delete('/delete-shift', authEndpoint.auth, async(req, res) => {
   if(req.user) {
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

      res.sendStatus(200)
   } else {
      res.sensStatus(403)
   }
})


module.exports = router;