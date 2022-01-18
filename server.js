const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const userRouter = require('./routes/users.router');

const app = express();

const PORT = process.env.PORT || 3000;

// views
app.use(expressLayouts);
app.set('view engine', 'ejs');

// routes
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.render('welcome');
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});