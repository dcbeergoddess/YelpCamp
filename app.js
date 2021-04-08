const express = require('express');
const engine = require('ejs-mate')
const path = require('path');
const mongoose = require('mongoose');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected')
});

const app = express();
PORT = 3000

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MONGOOSE MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//HOME
app.get('/', (req, res) => {
  res.render('home');
});

//INDEX
app.get('/campgrounds', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}));
//NEW FORM
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});
//POST ROUTE
app.post('/campgrounds', catchAsync(async (req, res, next) => {
  if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`campgrounds/${campground._id}`);
}));
//SHOW
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show', { campground });
}));
//UPDATE FORM
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/edit', { campground });
}));
//PUT ROUTE TO UPDATE
app.put('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
  //HAD ISSUES WHEN IT WAS `campgrounds/${campground._id}`
  res.redirect(`${campground._id}`);
}));
//DELETE ROUTE
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
}));

//BASIC ERROR HANDLERS
app.all('*', (req, res, next) => {
  next( new ExpressError('Page Not Found', 404));
  //this will pass it on the next function `app.use`
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).send(message);
});
//LISTENER
app.listen(PORT, () => {
  console.log(`LISTENING ON http://localhost:${PORT}`)
}); 
