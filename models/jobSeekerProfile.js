const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JobSeekerProfile = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please Add a name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please Add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please Add an email'],
    unique: true,
  },
  userType: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  resetPassword: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encript password using bcrypt
JobSeekerProfile.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
JobSeekerProfile.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in DB
JobSeekerProfile.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('JobSeekerProfile', JobSeekerProfile);
