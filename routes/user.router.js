const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const uploader = require("../config/cloudinary-setup");
const User = require('../models/user.model');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
  validationSignup
} = require("../helpers/middlewares");

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




//GET/api/user

router.get('/user', isLoggedIn, (req, res, next) => {
  const { _id } = req.session.currentUser;

  User.findById(_id)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((err) => {
    next(err);
  })
});

module.exports = router;