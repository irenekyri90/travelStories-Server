
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('./../helpers/middlewares');

const uploader = require("./../config/cloudinary-setup");

const User = require('./../models/user.model');
const Story = require('./../models/story.model');


// include CLOUDINARY:
//upload a single image per once.
// ADD an horitzontal middleware
router.post("/upload", uploader.single("image"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});


//GET ALL STORIES

router.get('/story', (req, res, next) => {
  Story
    .find()
    .then((allTheStories) => {
      res.status(200).json(allTheStories);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});



//GET '/api/story/:id' => to get one story 

router.get('/story/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ message: 'Specified id is not valid' })
    return;
  }

  Story
    .findById(id)
    .then((foundStory) => {
      res.status(200).json(foundStory);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});




//POST '/api/story'  => to post a new story

router.post('/story', (req, res, next) => {
  const { title, location, image, description, comments, likes, writtenBy } = req.body;

  Story.create({
    title,
    location,
    image,
    description,
    comments: [],
    likes: [],
    writtenBy
  })
  .then((createdStory) => {
    res.status(200).json(createdStory);
  })
  .catch((err) => {
    next(err)
  });
});


//PUT '/api/story/:id => edit story

router.put('/story/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, location, image, description, comments, likes, writtenBy } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ message: 'Specified id is not valid'});
    return;
  } 

  Story.findByIdAndUpdate(id, { title, location, image, description, comments, likes, writtenBy })
    .then((updatedStory) => {
      res.status(200).json(updatedStory);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  
});



//DELETE '/api/story/:id => delete story

router.delete('/story/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'specified id is not valid.' });
    return;
  }

  Story.findByIdAndRemove(id)
    .then(() => {
      res.status(202).send(`Document ${id} was removed successfully.`)
    })
    .catch( err => {
      res.status(500).json(err);
    })
});



module.exports = router;