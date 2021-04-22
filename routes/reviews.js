const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/review');
const Campground = require('../models/campground');

const { validateReview, isLoggedIn } = require('../middleware')

const catchAsync = require('../utils/catchAsync');

//ROUTES
//POST REVIEW TO CAMPGROUND ROUTE
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  //THERE IS A WAY TO DO NEXT TWO LINES TOGETHER
  await review.save();
  await campground.save();
  req.flash('success', 'Created new review!')
  res.redirect(`/campgrounds/${campground._id}`);
}));
//DELETE REVIEW
router.delete('/:reviewId', catchAsync(async (req, res) => {
  //DESTRUCTURE FROM REQ.PARAMS
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review')
  res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;
