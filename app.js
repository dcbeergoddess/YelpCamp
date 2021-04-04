const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected')
});

const app = express();
PORT = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.urlencoded({extended: true}))

//HOME
app.get('/', (req, res) => {
  res.render('home');
});

//INDEX
app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});
//NEW FORM
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
})
//POST ROUTE
app.post('/campgrounds', async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`campgrounds/${campground._id}`);
})
//SHOW
app.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show', { campground });
})

// END OF FILE
app.get('*', (req, res) => {
  res.send(`I DO NOT KNOW THAT PATH!!!!`)
})
app.listen(PORT, () => {
  console.log(`LISTENING ON http://localhost:${PORT}`)
}); 
