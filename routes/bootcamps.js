const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: 'hello world GET' });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: 'hello world POST' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ success: 'hello world UPDATE' });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ success: 'hello world DELETE' });
});

module.exports = router;
