module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash('error', 'you must be signed in');
    return res.redirect('/login'); //must return this otherwise next line runs and sends error to console
  }
  next();
};


