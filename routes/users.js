const express = require('express');
const router = express.Router();
const User = require('../models/user');

//RENDER FORM
router.get('/register', (req, res) => {
  res.render('users/register')
});

//POST FORM
router.post('/register', async (req, res) => {
  res.send(req.body); //TEST TO MAKE SURE WE ARE GETTING EVERYTHING WE SENT
})

module.exports = router;