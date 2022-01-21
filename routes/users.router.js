const express = require('express');

const userModel = require('../models/user-model/user.mongo');
const { saveUser } = require('../models/user-model/users.model');

const userRouter = express.Router();

// route to login page
userRouter.get('/login', (req, res) => res.render('login'));

// route to register page
userRouter.get('/register', (req, res) => res.render('register'));

userRouter.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  if(password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters long' });
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
    const user = await userModel.findOne({ email: email });
    if(user) {
      errors.push({msg: 'Email is already exists'});
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = {
        name,
        email,
        password
      }
      await saveUser(newUser);
      res.redirect('/users/login');
    }
  }
})

module.exports = userRouter;