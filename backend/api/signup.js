const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
   const email = req.body.email
   const userName = req.body.name
   const location = req.body.location
   const volunteerPreferences = req.body.volunteerPreferences
   const phone = req.body.phoneNumber;
   User.findOne({"email": email}).then( user => {
      if (user) {
         console.log(user)
         res.sendStatus(404)
      } else {
         let doc = new User({
            "email": email,
            "name": userName,
            "location": location,
            "volunteerPreferences": volunteerPreferences,
            "admin": false,
            "phoneNumber": phone,
            "shifts": [],
            "active": true,
            "signedWaiver": false,
         })
         doc.save()
         res.sendStatus(200)
      }
   })
})

module.exports = router
