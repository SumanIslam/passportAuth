const express = require('express');

const userRouter = express.Router();

// route to login page
userRouter.get('/login', (req, res) => res.send('login page'));

// route to register page
userRouter.get('/register', (req, res) => res.send('register page'));

module.exports = userRouter;