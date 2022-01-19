const express = require('express');

const userRouter = express.Router();

// route to login page
userRouter.get('/login', (req, res) => res.render('login'));

// route to register page
userRouter.get('/register', (req, res) => res.render('register'));

module.exports = userRouter;