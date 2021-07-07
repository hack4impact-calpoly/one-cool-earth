const express = require('express');
const File = require('../models/File');
const router = express.Router();
const authEndpoint = require('./auth')


router.post('/upload', async (req, res) => {
   // if (req.user.admin) {
      console.log(req.body)
      if (req.body.active) {
         await File.updateMany(
            {},
            {$set: 
               {active: false}
            },
         )
      }
      await File.findOne({"name": req.body.fileName}).then(function(file, err) {
         if (err)
            res.sendStatus(400) //is that the right error?!?!??!
         if (!file) 
            file = new File();
         file.name = req.body.fileName;
         file.description = req.body.description;
         file.active = req.body.active; //should it be false on upload??
         file.file.data = req.body.fileData;
         file.file.contentType = req.body.contentType
         file.save()
      })
      // const file = new File();
      // file.name = req.body.fileName;
      // file.description = req.body.description;
      // file.active = req.body.active; //should it be false on upload??
      // file.file.data = req.body.fileData;
      // file.file.contentType = req.body.contentType
      // file.save()
      res.sendStatus(200)
   // } else {
   //    res.sendStatus(403)
   // }
});

router.delete('/delete', authEndpoint.auth, async(req, res) => {
   if(req.user.admin) {
      fileName = req.body.fileName;

      await File.findOneAndDelete(
         {"name": fileName}
      )

      res.sendStatus(200)
   } else {
      res.sensStatus(403)
   }
})

router.post('/deactivate', authEndpoint.auth, async (req, res) => {
   if(req.user.admin) {
      let fileName = req.body.fileName;

      await File.findOne({"name": fileName}).then(function(file, err) {
         if (err)
            res.sendStatus(400) //is that the right error?!?!??!
         file.active = false; 
         file.save()
      })
      res.sendStatus(200)
   } else {
      res.sendStatus(403)
   }
});

router.post('/activate', authEndpoint.auth, async(req,res) => {
   console.log("calling activate")
   if(req.user.admin) {
      let fileName = req.body.fileName;

      // make sure all are deactivated
      await File.updateMany(
         {},
         {$set: 
            {active: false}
         },
      )

      // activate the one file
      await File.findOne({"name": fileName}).then(function(file, err) {
         if (err)
            res.sendStates(400) //is that the right error?!?!??!
         file.active = true; 
         file.save()
      })
      
      res.sendStatus(200)
   } else {
      res.sendStatus(403)
   }
})

module.exports = router;