const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {Login,Register,Delete} = require('../controller/AccountController');


// Login
router.post('/login',Login);


// Register
router.post('/Register', Register);


// Delete
router.delete('/DeleteUser',Delete);


module.exports = router;