const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema; 


//CREATE SCHEMA
const CampgroundSchema = new Schema ({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

//DELETE MIDDLEWARE
CampgroundSchema.post('findOneAndDelete', async function (doc) {
  //if we find a document
  if(doc){
    await Review.deleteMany({
      //this doc has reviews --> delete where their id field is in the document we just deleted in it's reviews array
      _id: {
        $in: doc.reviews
      }
    })
  } 
});

//EXPORT MODEL ----Compile Model--'Model Name`,  Schema
module.exports = mongoose.model('Campground', CampgroundSchema);
