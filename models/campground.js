const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


//CREATE SCHEMA
const CampgroundSchema = new Schema ({
  title: String,
  price: String,
  description: String,
  location: String,
});

//EXPORT MODEL ----Compile Model--'Model Name`,  Schema
module.exports = mongoose.model('Campground', CampgroundSchema);
