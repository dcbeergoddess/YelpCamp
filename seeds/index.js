const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected')
});

//GRAB RANDOM ELEMENT FROM AN ARRAY
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    //CREATE LOOP FOR DATA - 50 times - 50 cities
    for(let i = 0; i < 300; i++){
        //random number to pick city[from 1000 city array]
        const random1000 = Math.floor(Math.random() * 1000);
        //random number for price
        const price = Math.floor(Math.random() * 20) + 10
        //make new Campground - location: city, state
        const camp = new Campground({
          //YOUR USER ID
          author: '608056f48d40d841ba08c88d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet incidunt maiores consectetur asperiores iure obcaecati quia voluptatum ipsa error, optio illo molestiae enim voluptatem itaque suscipit? Culpa excepturi libero deleniti.',
            price, //shorthand do not need price: price 
            geometry : { 
              type: "Point", 
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ] 
            },
            images: [
              {
                url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/c_scale,h_400,w_667/v1619634360/YelpCamp/hyxreqbomfjh2vkju6ub.jpg',
                filename: 'YelpCamp/umcsznh3trem2nwuze7k'
              },
              {
                url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/c_scale,h_600,w_400/v1619476221/YelpCamp/gehzdoz6zi9yrdwehslg.jpg',
                filename: 'YelpCamp/gehzdoz6zi9yrdwehslg'
              }
            ],
        });
        await camp.save()
    }
};

//seedDB returns a promise because it is an async function .then--> close connection
seedDB().then(() => {
    mongoose.connection.close();
});

