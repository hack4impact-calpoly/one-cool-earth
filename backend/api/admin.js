const express = require("express");
const User = require("../model/User");
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
	res.send(users);
});
