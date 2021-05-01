const express = require('express');

const User = require('../models/User');
const router = express.Router();


router.get('/', (req, res) => {
   console.log("testing");
   console.log(req.user);
   const email = req.user.email;
   User.findOne({"email": email}).then(function(user) {
      if(!user) {
         console.log("User not found")
         res.send("User not found")
      }
      else {
         res.send(user.availableDates)
      }
   })
});

module.exports = router;
