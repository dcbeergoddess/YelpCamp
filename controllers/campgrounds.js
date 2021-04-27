const Campground = require('../models/campground');
//INDEX
module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
};
//NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new');
};
//CREATE NEW CAMPGROUND
module.exports.createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  //map over req.files array and set url to be path and filename to be the filename
  campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.author = req.user._id;
  await campground.save();
  //TEST RESULT FOR NEW IMAGE ARRAY UPLOAD
  console.log(campground);
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`campgrounds/${campground._id}`);
};
//SHOW CAMPGROUND PAGE
module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  }).populate('author');
  // console.log(campground);
  if(!campground){
    req.flash('error', 'Cannot find that campground');
    return res.redirect('/campgrounds');
  }
  //TEST THAT IT'S WORKING WITH CAMPGROUND
  // console.log(campground);
  res.render('campgrounds/show', { campground });
};
//UPDATE FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
  if(!campground){
    req.flash('error', 'Cannot find that campground');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
};
//PUT ROUTE TO UPDATE
module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  //spread array into push --> take data from array and pass into push
  campground.images.push(...imgs);
  await campground.save();
  if(req.body.deleteImages) {
    //COMPLICATED QUERY --> want to pull images where filename is in the req.body.deleteImages
    await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages }}}})
    console.log(campground)
  };
  req.flash('success', 'Successfully updated campground!')
  //HAD ISSUES WHEN IT WAS `campgrounds/${campground._id}`
  res.redirect(`${campground._id}`);
};
//DELETE ROUTE -- DESTROY
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted campground')
  res.redirect('/campgrounds');
}