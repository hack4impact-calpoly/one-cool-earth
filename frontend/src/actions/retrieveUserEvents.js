const User = require('../models/User');

const getDates = async () => {
  const email = req.user.email

  if (req.user) {
    return await User.findOne({'email': req.user.email}).dates
  }
  else {
    console.log("User not found")
  }
}