const express = require('express');
const dotenv = require('dotenv');

// Routes files
const bootcamps = require('./routes/bootcamps');

// Load env variables
const result = dotenv.config({ path: './config/config.env' });

const app = express();

app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
console.log('#E>', process.env.NODE_ENV);
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
