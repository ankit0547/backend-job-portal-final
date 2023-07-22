const express = require('express');
const {
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcamp,
} = require('../controllers/bootcamps');
const router = express.Router();

router.get('/', getBootcamps);

router.get('/', getBootcamp);

router.post('/', createBootcamp);

router.put('/:id', updateBootcamp);

router.delete('/:id', deleteBootcamp);

module.exports = router;
