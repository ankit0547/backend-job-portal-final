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

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Routes files
const bootcampsRoute = require('./routes/bootcamps');
const userRoute = require('./routes/auth');

console.log(process.env.NODE_ENV);
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/api/v1/bootcamps', bootcampsRoute);
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
