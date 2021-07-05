const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authEndpoint = require('./auth')

const editUser = async (email, name, phoneNumber, location, volunteerPreferences) => {
   await User.findOne({"email": email})
   .then( user => {
      user.name = name
      user.phoneNumber = phoneNumber
      user.location = location
      user.volunteerPreferences = volunteerPreferences
      user.save()
   });
};

router.get('/get-all', async(req, res) => {
   User.find({}).then(users => {
      res.json(users)
   })
})

router.post('/edit', authEndpoint.auth, async (req, res) => {
   if (req.user) {
      const name = req.body.name
      const phoneNumber = req.body.phoneNumber
      const location = req.body.location
      const volunteerPreferences = req.body.volunteerPreferences
      await editUser(req.user.email, name, phoneNumber, location, volunteerPreferences)
      res.sendStatus(200)
   } else {
      res.sendStatus(403)
   }
});

router.get('/:email', authEndpoint.auth, async (req, res) => {
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
