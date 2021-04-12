const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


//CREATE SCHEMA
const CampgroundSchema = new Schema ({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

//EXPORT MODEL ----Compile Model--'Model Name`,  Schema
module.exports = mongoose.model('Campground', CampgroundSchema);
