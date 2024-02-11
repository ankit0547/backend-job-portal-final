const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Routes files
const employerRoutes = require('./routes/employer');
const jobSeekerRoutes = require('./routes/jobSeeker');
const userRoute = require('./routes/auth');

console.log(process.env.NODE_ENV);
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/api/v1/employer', employerRoutes);
app.use('/api/v1/jobSeeker', jobSeekerRoutes);
app.use('/api/v1/auth', userRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);

// Handdle unhandled promise rejection

process.on('unhandledRejection', (err, promise) => {
  // console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
