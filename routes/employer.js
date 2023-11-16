const express = require('express');
const {
  registerEmployer,
  postJob,
  updateBootcamp,
  deleteBootcamp,
  getBootcamp,
} = require('../controllers/employer');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerEmployer);

// router.post('/:id', getBootcamp);

router.post('/postJob', protect, postJob);

// router.put('/:id', updateBootcamp);

// router.delete('/:id', deleteBootcamp);

module.exports = router;
