const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema; 

//NEW IMAGE SCHEMA
const ImageSchema = new Schema({
  url: String,
  filename: String
});

//use virtual because we do not need to store this information. We still need to request image url from database -- no need to store two
//every time we call thumbnail we are going to do this little calculation --> very lightweight
ImageSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_200');
});

//INCLUDE VIRTUALS
const opts = { toJSON: { virtuals: true } };

//CREATE SCHEMA
const CampgroundSchema = new Schema ({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
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
}, opts);


//FOR MAPBOX POPUP --> NESTED
CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
  return `<a href="/campgrounds/${this._id}">${this.title}</a>`;
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
