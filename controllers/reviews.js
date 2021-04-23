const Review = require('../models/review');
const Campground = require('../models/campground');
//PST REVIEW TO CAMPGROUND ROUTE
module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  //After we make review we set:
  review.author = req.user._id;
  campground.reviews.push(review);
  //THERE IS A WAY TO DO NEXT TWO LINES TOGETHER
  await review.save();
  await campground.save();
  req.flash('success', 'Created new review!');
  res.redirect(`/campgrounds/${campground._id}`);
};
//DELETE REVIEW
module.exports.deleteReview = async (req, res) => {
  //DESTRUCTURE FROM REQ.PARAMS
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review')
  res.redirect(`/campgrounds/${id}`);
};