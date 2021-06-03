const mongoose = require('mongoose');
const Announcement = require('../models/Announcement.js');
const authEndpoint = require('./auth');
const express = require('express');
const router = express.Router();

/*
    Body need not be supplied to '/'
*/

router.get('/',  authEndpoint.auth,  // retrieves all announcements
    async (request, response) => {
        if (request.user) {
            await Announcement.find({}, function (error, announcements) {
                if (error) {
                    console.log(error)
                    response.sendStatus(503);  // Service Unavailable (mongoose failure)
                }
                else {
                    response.status(200).json(announcements);
                }
            }); 
        }
        else if (!request.user)
            response.sendStatus(401);  // Unauthorized (user identity not known)
    }
);

/*
    Body for '/create' should be of the form:
    {
        "title": String,
        "description": String
    }
*/

router.post('/create', authEndpoint.auth,
    async (request, response) => {
        if (request.user && request.user.admin) {
            if (!request.body.title || !request.body.description)
                response.sendStatus(400);  // Bad Request (empty data fields)
            else
                Announcement.create(  // no need to check if document already exists
                    {
                        title: request.body.title,
                        description: request.body.description
                    }, function (error) {
                        if (error) {
                            console.log(error)
                            response.sendStatus(503);  // Service Unavailable (mongoose failure)
                        }
                        else
                            response.sendStatus(200);  // OK
                    });
        }
        else if (!request.user)
            response.sendStatus(401);  // Unauthorized (user identity not known)
        else if (!request.user.admin)
            response.sendStatus(403);  // Forbidden (user identity know, but lacking necessary privilege)
    }
);

/*
    Body for '/delete' should be of the form:
    {
        "id": String
    }
*/

router.post('/delete', authEndpoint.auth,
    async (request, response) => {
        if (request.user && request.user.admin) {
            if (!request.body.id)
                response.sendStatus(400);  // Bad Request (empty data field)
            else
                Announcement.deleteOne(
                    {
                        _id: request.body.id
                    }, function (error) {
                        if (error) {
                            console.log(error)
                            response.sendStatus(503);  // Service Unavailable (mongoose failure)
                        }
                        else
                            response.sendStatus(200);  // OK
                    });
        }
        else if (!request.user)
            response.sendStatus(401);  // Unauthorized (user identity not known)
        else if (!request.user.admin)
            response.sendStatus(403);  // Forbidden (user identity know, but lacking necessary privilege)
    }
);

module.exports = router;