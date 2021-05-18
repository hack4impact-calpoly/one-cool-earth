const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async(req, res) => {
   email = req.body.email
   name = req.body.name
   availableDates = req.body.availableDates
   location = req.body.location
   volunteerPreferences = req.body.volunteerPreferences
   existing = await User.find({"email": email})
   console.log(existing)
   if (existing == []) {
      res.send("you already have an account, plaese log in")
   } else {
      var doc = new User({"email": email, "name": name, "availableDates": availableDates, "location": location, "volunteerPreferences": volunteerPreferences, "admin": false})
      doc.save()
      res.redirect("/api/auth/google")
   }
})

module.exports = router;