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

router.post('/createLocation', async(req, res) => {
    await addLocation(req.body.name)
    res.sendStatus(200)
})
router.post('/deleteLocation', async (req, res) => { 
      const name = req.body.name
      await deleteLocation(name);
      res.sendStatus(200)
});
router.get('/get-all', authEndpoint.auth, async(req, res) => {
  Location.find({}).then(locations => {
    res.status(200);
    res.json(locations)
  })
})
module.exports = router