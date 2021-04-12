const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const reviewSchema = new Schema({
  body: String, //TEXT
  rating: Number //probably 1-5
});

//Compile && Export Model
module.exports = mongoose.model('Review', reviewSchema);