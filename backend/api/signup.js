const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async(req, res) => {
   userEmail = req.body.email
   userName = req.body.name
   location = req.body.location
   volunteerPreferences = req.body.preferences
   await User.findOne({"email": userEmail})
   .then( (user) => {
      if (user) {
         res.status(200);
         res.send("you already have an account, plaese log in")
      } else {
         var doc = new User({
               "email": userEmail, 
               "name": userName, 
               "location": location, 
               "volunteerPreferences": volunteerPreferences, 
               "admin": false})
         doc.save()
         res.sendStatus(200);
      }
   })
})

module.exports = router;