const express = require('express');

const userRouter = express.Router();

// route to login page
userRouter.get('/login', (req, res) => res.render('login'));

// route to register page
userRouter.get('/register', (req, res) => res.render('register'));

userRouter.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  if(password.length < 6) {
    errors.push({msg: 'Password must be at least 6 characters long'});
  }

  if(password !== password2) {
    errors.push({msg: 'Passwords do not match'});
  }

  if(errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    res.send('pass');
  }
})

module.exports = userRouter;