const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
//models
const Campground = require('./models/campground');
const Review = require('./models/review');
//routers
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
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
//PUBLIC MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
//SESSION MIDDLEWARE
const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    //BASIC SECURITY
    httpOnly: true, 
    //have cookie expire after week
    //Date.now() --> produces date in milliseconds
    // Date.now() + milliseconds * seconds * minutes * hours * days
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  //Every Request has access now
  res.locals.success = req.flash('success');
  res.locals.success = req.flash('error');
  next();
});

//ROUTER MIDDLEWARE
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

//HOME
app.get('/', (req, res) => {
  res.render('home');
});

//BASIC ERROR HANDLERS
app.all('*', (req, res, next) => {
  next( new ExpressError('Page Not Found', 404));
  //this will pass it on the next function `app.use`
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if(!err.message) err.message = 'Oh No, Something went Wrong';
  res.status(statusCode).render(`error`, { err });
});
//LISTENER
app.listen(PORT, () => {
  console.log(`LISTENING ON http://localhost:${PORT}`)
}); 
