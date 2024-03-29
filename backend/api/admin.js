const express = require("express");
const User = require('../models/User');
const router = express.Router();
const authEndpoint = require('./auth')

const removeAdmin = async (email) => {
	User.findOne({"email": email})
	.then(user => {
		if (user) {
			user.admin = false
			user.save()
		}
	})
}

const makeAdmin = async (email) => {
	User.findOne({"email": email})
	.then(user => {
		if (user) {
			user.admin = true
			user.save()
		}
	})
}

const deactivateUser = async (email) => {
    User.findOne({"email": email})
	 .then(user => {
		if(user) {
			user.active = false
			user.save()
		}
    });
};

router.post('/deactivateUser', authEndpoint.auth, async (req, res) => {
	if (req.user && req.user.admin) {
		const email = req.body.email
		await deactivateUser(email)
		res.sendStatus(200)
	}
	else {
		res.sendStatus(403)
	}
});

router.post('/deleteUser', authEndpoint.auth, async (req, res) => {
	if (req.user && req.user.admin) {
		const email = req.body.email
		await User.deleteOne({"email": email})
		res.sendStatus(200)
	}
	else {
		res.sendStatus(403)
	}
})

router.post('/makeAdmin', authEndpoint.auth, async (req, res) => {
	if (req.user && req.user.admin) {
		const email = req.body.email
		await makeAdmin(email)
		res.sendStatus(200)
	}
	else {
		res.sendStatus(403)
	}
})

router.post('/removeAdmin', authEndpoint.auth, async (req, res) => {
	if (req.user && req.user.admin) {
		const email = req.body.email
		await removeAdmin(email)
		res.sendStatus(200)
	}
	else {
		res.sendStatus(403)
	}

})

router.get('/get-user-name/:id', authEndpoint.auth, async (req, res) => {
	if (req.user && req.user.admin) {
		const userId = req.params.id
		User.findById(userId)
			.then( user => {
			if (user) {
				res.status(200)
				res.json(user.name)
			} else {
				res.sendStatus(404)
			}
		})
	} else {
		res.sendStatus(403)
	}
})

module.exports = router;
