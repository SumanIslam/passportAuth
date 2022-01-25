const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const userRouter = require('./routes/users.router');

const passportSetup = require('./services/passport-setup');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const config = {
  MONGO_URI: process.env.MONGO_URI,
}

// views (ejs)
app.use(expressLayouts);
app.set('view engine', 'ejs');

// bodyParser
app.use(express.urlencoded({ extended: true }));

// express session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// connect mongodb
mongoose.connect(config.MONGO_URI, () => {
  console.log('mongodb is connected');
})

// routes
app.use('/users', userRouter);

// welcome route
app.get('/', (req, res) => {
  res.render('welcome');
});

// dashboard route
app.get('/dashboard', (req, res) => {
  console.log(req.user);
  res.render('dashboard', {user: req.user})
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});