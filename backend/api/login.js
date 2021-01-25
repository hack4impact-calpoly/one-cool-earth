const express = require('express');
const router = express.Router();

//User Schema -- filename could be different
const User = require('../model/user');

/*
	POST user's email and password to login endpoint
*/
router.post('/api/login', async(req, res) => {
	//Pass in user email
	email = User.find({title:email});
	if(typeof email === undefined || email.length === 0){
		res.send('ERROR: NO EMAIL FOUND');
	}
	
	//Pass in user password
	pass = User.find({title:password});
	if(typeof pass === undefined || pass.length === 0){
		res.send('ERROR: NO PASSWORD FOUND');
	}
	

	res.status(200);
	//Placeholder -- will replace with actual POST request
	res.send('POST user email and password');
})


