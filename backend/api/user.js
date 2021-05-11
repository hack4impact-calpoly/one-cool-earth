const express = require('express');

const User = require('../models/User');
const router = express.Router();

const editUser = async (email, name, availableDates, location, volunteerPreferences) => {
    User.findOne({"email": email}).then(function(user) {
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

router.post('/edit', async (req, res) => {
   if (req.user.admin || req.user.email == req.body.email) {
      email = req.body.email
      name = req.body.name
      availableDates = req.body.availableDates
      location = req.body.location
      volunteerPreferences = req.body.volunteerPreferences
      await editUser(email, name, availableDates, location, volunteerPreferences)
      res.send("success")
   }
   else {
      res.send("not allowed to edit")
   }
});

module.exports = router;