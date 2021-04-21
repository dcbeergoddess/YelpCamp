const express = require('express');
const router = express.Router();
const User = require('../models/user');

//RENDER FORM
router.get('/register', (req, res) => {
  res.render('users/register')
});

module.exports = router;