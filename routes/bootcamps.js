const express = require('express');
const {
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcamp,
} = require('../controllers/bootcamps');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getBootcamps);

router.post('/:id', getBootcamp);

router.post('/', protect, createBootcamp);

router.put('/:id', updateBootcamp);

router.delete('/:id', deleteBootcamp);

module.exports = router;
