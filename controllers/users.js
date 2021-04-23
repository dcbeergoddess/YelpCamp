const User = require('../models/user');
//RENDER REGISTER FORM
module.exports.renderRegister = (req, res) => {
  res.render('users/register')
};
//REGISTER USER
module.exports.registerU = async (req, res) => {
  try {
    //destructure what we want from req.body
    const { email, username, password } = req.body; 
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    // console.log(registeredUser);
    req.login(registeredUser, err => {
      if(err) return next(err) 
      req.flash('success', 'Welcome To Yelp Camp!');
      res.redirect('/campgrounds');
    });
  } catch(e) {
    req.flash('error', e.message);
    res.redirect('register');
  };
};
//RENDER LOGIN FORM
module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};
//LOGIN
module.exports.login = (req, res) => {
  req.flash('success', 'welcome back!');
  const redirectURL = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectURL);
};
//LOGOUT
module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', "GoodBye!")
  res.redirect('/campgrounds');
};