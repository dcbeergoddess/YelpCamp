const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const users = require('../controllers/users')

//RENDER REGISTER FORM
router.get('/register', users.renderRegister);

//POST REGISTER FORM
router.post('/register', catchAsync(users.register));

//RENDER LOGIN FORM
router.get('/login', users.renderLogin);

//POST LOGIN
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

//LOGOUT
router.get('/logout', users.logout);

module.exports = router;