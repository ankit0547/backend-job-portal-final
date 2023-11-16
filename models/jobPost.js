const mongoose = require('mongoose');

const JobPost = new mongoose.Schema({
  job_title: {
    type: String,
    required: [true, 'Please  enter Job title'],
  },
  job_desc: {
    type: String,
    required: [true, 'Please enter Job description'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Jobs', JobPost);
