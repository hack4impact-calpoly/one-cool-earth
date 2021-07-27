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

router.post('/get-all', authEndpoint.auth, (req, res) => {
   if(req.user && req.user.admin) {
      User.find({}).then(users => {
         res.status(200)
         res.json(users)
      })
   } else {
      res.sendStatus(403)
   }
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

router.post('/shifts', authEndpoint.auth, (req, res) => {
   if(req.user) {
      const email = 'quemona98@gmail.com'
      User.findOne({'email': email})
          .then( user => {
             const userShifts = user.shifts
             res.status(200)
             res.json(userShifts)
          })
   } else {
      res.sendStatus(403)
   }
})

router.post('/add-shift', authEndpoint.auth, async(req,res) => {
   if(req.user) {
      const email = req.user.email
      const shiftId = req.body.shiftId
      User.findOneAndUpdate(
          {'email': email},
          {
             $push:
                 {shifts: shiftId}
          },
      ).then(() => {
            res.sendStatus(200)
      })
   } else {
      res.sendStatus(403)
   }
})

router.delete('/delete-shift', authEndpoint.auth, async(req, res) => {
   if(req.user) {
      const email = req.user.email;
      const shiftId = req.body.shiftId;
      await User.findOneAndUpdate(
         {email: email},
         {$pull:
            {shifts: shiftId}
         },
      );
      res.sendStatus(200)
   }
   else {
      res.sendStatus(403)
   }
})

router.post('/signed-waiver', async (req, res) => {
   email = req.body.email
   User.findOneAndUpdate(
       { "email": email },
       { "signedWaiver": true }
   ).then( (user) => {
      res.sendStatus(200)
    })
})


module.exports = router;
