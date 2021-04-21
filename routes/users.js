const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');

//RENDER REGISTER FORM
router.get('/register', (req, res) => {
  res.render('users/register')
});

//POST REGISTER FORM
router.post('/register', catchAsync(async (req, res) => {
  try {
    //destructure what we want from req.body
    const { email, username, password } = req.body; 
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    // console.log(registeredUser);
    req.flash('success', 'Welcome To Yelp Camp!');
    res.redirect('/campgrounds');
  } catch(e) {
    req.flash('error', e.message);
    res.redirect('register');
  };
}));

//RENDER LOGIN FORM
router.get('/login', (req, res) => {
  res.render('users/login');
});

//POST LOGIN
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async (req, res) => {
  req.flash('success', 'welcome back!');
  res.redirect('/campgrounds');
});

//LOGOUT
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', "GoodBye!")
  res.redirect('/campgrounds');
});

module.exports = router;