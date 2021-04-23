const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const Campground = require('../models/campground');

//INDEX
router.get('/', catchAsync(campgrounds.index));
//NEW FORM
router.get('/new', isLoggedIn, campgrounds.renderNewForm);
//POST NEW CAMPGROUND ROUTE
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
//SHOW
router.get('/:id', catchAsync(campgrounds.showCampground));
//UPDATE FORM
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
//PUT ROUTE TO UPDATE
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));
//DELETE ROUTE --> RUBY USES DESTROY
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;
