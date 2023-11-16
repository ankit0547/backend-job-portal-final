const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CompanyProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Add a name'],
  },
  company_name: {
    type: String,
    required: [true, 'Please Add a name'],
  },
  company_email: {
    type: String,
    required: [true, 'Please Add an email'],
    unique: true,
  },
  company_description: {
    required: [true, 'Please Add user type'],
    type: String,
    default: '',
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
CompanyProfileSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
CompanyProfileSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in DB
CompanyProfileSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('CompanyProfileSchema', CompanyProfileSchema);
