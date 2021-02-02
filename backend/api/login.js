const express = require('express');
const router = express.Router();

//User Schema -- filename could be different
const User = require('../model/user');

/*
	Query database and return User object with matching email/password
*/
const getUser = async (email, password) => {
	return await User.find({
		email: email,
		password: password
	})
}

/*
	POST User object to /api/login endpoint
*/
router.post('/api/login', async(req, res) => {
	const email = req.body.email
	const password = req.body.password
	
	let user
	user = await getUser(email, password)
	
	res.status(200)
	res.json(user)
	res.send('POST user email and password')
})


