const express = require("express");
const User = require('../models/User');
const router = express.Router();
const authEndpoint = require('./auth')

const deactivateUser = async (name, email) => {
	console.log(name.first);
    User.findOne({"email": email}).then(function(user) {
    	console.log(user)
    	user.status = false
    	user.save()
    	console.log(user.status)
    });
};

router.post('/deactivateUser', authEndpoint.auth, async (req, res) => {
	if (req.user && req.user.admin) {
		name = req.body.name
		email = req.body.email
		await deactivateUser(name, email)
		res.sendStatus(200)
	}
	else {
		res.sendStatus(403)
	}
});

router.post('/deleteUser', authEndpoint.auth, async (req, res) => {
	if (req.user && req.user.admin) {
		name = req.body.name
		email = req.body.email
		await User.deleteOne({"email": email})
		res.sendStatus(200)
	}
	else {
		res.send("not an admin")
	}
})

module.exports = router;