const express = require("express");
const User = require('../models/User');
const router = express.Router();

router.post("/", async (req, res) => {
	const field = req.body.field;
	const data = req.body[field];
	let queryFilter = {};
	queryFilter[field] = data;
	let users;
	if(field === "all"){
		users = await User.find({});
	}else{
		users = await User.find(queryFilter);
	}
	res.status(200);
	res.json(users);
});

const deactivateUser = async (name, email) => {
	console.log(name.first);
    User.findOne({"email": email}).then(function(user) {
    	console.log(user)
    	user.status = false
    	user.save()
    	console.log(user.status)
    });
};

router.post('/deactivateUser', async (req, res) => {
	if (req.user.admin) {
		name = req.body.name
		email = req.body.email
		await deactivateUser(name, email)
		res.send("success")
	}
	else {
		res.send("not an admin")
	}
});

router.post('/deleteUser', async (req, res) => {
	if (req.user.admin) {
		name = req.body.name
		email = req.body.email
		await User.deleteOne({"email": email})
		res.send("success")
	}
	else {
		res.send("not an admin")
	}
})

module.exports = router;