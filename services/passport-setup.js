const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const userModel = require('../models/user-model/user.mongo');
const { getUser } = require('../models/user-model/users.model')

// serializeUser function to save user in browser cookie
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// deSerializeUser function to get the cooking from browser
passport.deserializeUser((id, done) => {
  getUser(id).then(user => {
    done(null, user);
  })
})

passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
  userModel.findOne({email: email}, (err, user) => {
    if(err) { 
      return done(err);
    }

    if (!user) { 
      return done(null, false, {message: "Email is not registered"}); 
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: "Password is incorrect"});
      }
    })
  });
}))
