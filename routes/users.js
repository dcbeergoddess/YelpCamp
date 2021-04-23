const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const users = require('../controllers/users')

router.route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router.route('/login')
  .get(users.renderLogin)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

//LOGOUT
router.get('/logout', users.logout);

//RENDER REGISTER FORM
// router.get('/register', users.renderRegister);
//POST REGISTER FORM
// router.post('/register', catchAsync(users.register));
//RENDER LOGIN FORM
// router.get('/login', users.renderLogin);
//POST LOGIN
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

module.exports = router;