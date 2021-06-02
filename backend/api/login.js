const express = require('express');
const User = require('../models/User');
const router = express.Router();
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
router.post('/', async(req, res) => {
	try{
		const email = req.body.email
		const password = req.body.password

		console.log(email)
		console.log(password)
	
		// let user
		// user = await getUser(email, password)
	
		res.status(200)
		//res.json(user)
		res.json({string: 'POST user email and password'})
	}
	catch(error){
		console.log(error)
	}
});

module.exports = router;

