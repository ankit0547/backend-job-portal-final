const express = require('express');
const { register, login, allUsers } = require('../controllers/auth');
const router = express.Router();

// router.post('/register', register);
router.post('/login', login);
router.get('/users', allUsers);

module.exports = router;
