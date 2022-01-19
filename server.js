const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const userRouter = require('./routes/users.router');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const config = {
  MONGO_URI: process.env.MONGO_URI,
}

// views
app.use(expressLayouts);
app.set('view engine', 'ejs');

// connect mongodb
mongoose.connect(config.MONGO_URI, () => {
  console.log('mongodb is connected');
})

// routes
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.render('welcome');
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});