const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('campground[image]'), validateCampground, catchAsync(campgrounds.createCampground));

//NEW FORM --> needs to be before /:id
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, 
    isAuthor,
    upload.array('campground[image]'), 
    validateCampground, 
    catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, 
    isAuthor, 
    catchAsync(campgrounds.deleteCampground));

//UPDATE FORM
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

//INDEX
// router.get('/', catchAsync(campgrounds.index));
//POST NEW CAMPGROUND ROUTE
// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
//SHOW
// router.get('/:id', catchAsync(campgrounds.showCampground));
//PUT ROUTE TO UPDATE
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));
//DELETE ROUTE --> RUBY USES DESTROY
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;
