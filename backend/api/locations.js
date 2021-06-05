const express = require('express');
const Location = require('../models/Locations');
const router = express.Router();
const authEndpoint = require('./auth')

const deleteLocation = async (name) => {
  Location.findOne({name: name}).then((data) => {
      if(data)
      {
          Location.deleteOne({ name: name }).then(function(){
              console.log("Data deleted"); 
          }).catch(function(error){
              console.log(error);
          }); 
          
      }
  });
};

const addLocation = async (name) => {
  Location.findOne({name : name}).then(location => {
    if(!location){
      const location = Location.create({
        name : name
      });
    };
  }).catch(error => {
    console.log(error)
  });
};

router.post('/createLocation', authEndpoint.auth, async(req, res) => {
  if(req.user && req.user.admin){
      await addLocation(req.body.name)
      res.sendStatus(200)
  }
})
router.post('/deleteLocation', authEndpoint.auth, async (req, res) => { 
  if(req.user && req.user.admin){
      const name = req.body.name
      await deleteLocation(name);
      res.sendStatus(200)
  }
});
router.get('/get-all', authEndpoint.auth, async(req, res) => {
  if(req.user){
    Location.find({}).then(locations => {
      res.status(200);
      res.json(locations)
    })
  }
})

module.exports = router