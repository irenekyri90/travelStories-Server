
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('../helpers/middlewares');

const User = require('../models/user.model');

const Comment = require('../models/comment.model');
const uploader = require("../config/cloudinary-setup");


//POST '/api/comments'  => to post a new comment


//GET ALL STORIES

router.get('/comments', (req, res, next) => {
  Comment
    .find()
    .then((allComments) => {
      res.status(200).json(allComments);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});



router.post('/comments', (req, res, next) => {
  const { comment, likes, writtenBy } = req.body;

  Comment.create({ comment,
     likes: [],
      writtenBy })
      .then((createdComment) => {
        res.status(200).json(createdComment);
      })
      .catch((err) => {
        next(err)
      });
});



//DELETE '/api/comments/:id => delete comment

router.delete('/comments/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'specified id is not valid.' });
    return;
  }
   Comment.findByIdAndRemove(id)
    .then(() => {
      res.status(202).send(`Document ${id} was removed successfully.`)
    })
    .catch( err => {
      res.status(500).json(err);
    });
});



//GET/api/comment get one comment

router.get('/comments/:id', (req, res, next) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ message: 'specified id is not valid' })
      return;
  }
  Comment
    .findById(id)
    .then((foundComment) => {
      res.status(200).json(foundComment);
    })
    .catch((err) => {
      res.status(500).json(err)
    })
});



// //GET '/api/story/:id' => to get one story 

// router.get('/story/:id', (req, res) => {
//   if ( !mongoose.Types.ObjectId.isValid(id)) {
//     res
//       .status(400)
//       .json({ message: 'Specified id is not valid' })
//     return;
//   }

//   Story
//     .findById(id)
//     .then((foundStory) => {
//       res.status(200).json(foundStory);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     })
// });




module.exports = router;