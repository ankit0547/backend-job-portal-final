const express = require('express');
const dotenv = require('dotenv');

// Load env variables
const result = dotenv.config({ path: './config/config.env' });
console.log(result);

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 5000;
console.log('#E>', process.env.NODE_ENV);
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
