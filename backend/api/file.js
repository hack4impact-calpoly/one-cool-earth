const express = require('express');
const File = require('../models/File');
const router = express.Router();
const authEndpoint = require('./auth')
const formidable = require('formidable');
const fs = require('fs')

router.post('/upload', authEndpoint.auth, async (req, res) => {
   const form = formidable({ multiples: true });

   form.parse(req, async (err, fields, files) => {
      if (err) {
         next(err);
         return;
      }

      if (req.user.admin) {
      console.log(fields)
      console.log(fields.fileName)
      console.log(files)
      console.log(files.File.path)
      if (fields.active) {
         await File.updateMany(
            {},
            {$set: 
               {active: false}
            },
         )
      }
      await File.findOne({"name": fields.fileName}).then(function(file, err) {
         if (err)
            res.sendStatus(400) 
         if (!file) 
            file = new File();

         var newFile = fs.readFileSync(files.File.path)
         var encFile = newFile.toString('base64')
         var bin = new Buffer(encFile, 'base64')

         file.name = fields.fileName;
         file.description = fields.description;
         file.active = false;
         file.file.contentType = files.File.type;
         file.file.data = bin;
         file.save()
      })
      res.sendStatus(200)
   } else {
      res.sendStatus(403)
   }
   });
   
});

router.delete('/delete', authEndpoint.auth, async(req, res) => {
   if(req.user.admin) {
      console.log(req.body.fileName)
      fileName = req.body.fileName;

      await File.findOneAndDelete({"name": fileName}).then(function(err) {
         if (err)
            res.sendStatus(400)
         res.sendStatus(200)
      })
   } else {
      res.sensStatus(403)
   }
})

router.post('/deactivate', authEndpoint.auth, async (req, res) => {
   if(req.user.admin) {

      await File.updateMany(
         {},
         {$set: 
            {active: false}
         },
      )

      res.sendStatus(200)
   } else {
      res.sendStatus(403)
   }
});

router.post('/activate', authEndpoint.auth, async(req,res) => {
   console.log("calling activate")
   console.log(req.body.fileName)
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
            res.sendStatus(400)
         file.active = true; 
         file.save()
      })
      
      res.sendStatus(200)
   } else {
      res.sendStatus(403)
   }
})

router.get('/get-all', authEndpoint.auth, async(req,res) => {
   console.log(req.body)
   console.log("calling get-all")
   if (req.user.admin) {
      await File.find({}).then(function(files, err) {
         if (err)
            res.sendStatus(400)
         res.status(200)
         res.send(files)
      })
   } else {
      res.sendStatus(403)
   }
})

router.get("/get", authEndpoint.auth, async(req, res) => {
   console.log("calling get one")
   await File.findOne({"active": true}).then(function(file, err) {
      if (err)
         res.sendStatus(400)
      res.status(200)
      res.send(file)
   })
})

module.exports = router;