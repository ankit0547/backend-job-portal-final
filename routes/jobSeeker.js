const express = require('express');
const {
  registerJobSeeker,
  postJob,
  updateBootcamp,
  deleteBootcamp,
  getBootcamp,
} = require('../controllers/jobSeeker');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerJobSeeker);

// router.post('/:id', getBootcamp);

// router.post('/postJob', protect, postJob);

// router.put('/:id', updateBootcamp);

// router.delete('/:id', deleteBootcamp);

module.exports = router;
