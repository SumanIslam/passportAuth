const express = require('express');

const userRouter = require('./routes/users.router');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome');
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});