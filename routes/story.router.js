
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('./../helpers/middlewares');

const User = require('./../models/user.model');
const Story = require('./../models/story.model');



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