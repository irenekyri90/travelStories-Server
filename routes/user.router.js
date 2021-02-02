const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user.model');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
  validationSignup
} = require("../helpers/middlewares");

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