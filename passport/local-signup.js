const User = require('../models/User');

const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  
  const userData = {
    username: username.trim(),
    password: password.trim(),
    email: req.body.email,
    name: req.body.name,
    imageUrl: req.body.imageUrl
  };
    
  const newUser = new User(userData);
  newUser.save((err, user) => {
    if (err) { return done(err, user); }

    return done(null, user);
  });

});