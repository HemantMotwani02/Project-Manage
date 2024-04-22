const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {AddLog,ShowLogs,LogStatus} = require('../controller/LogController');

// Add Log
router.post('/AddLog',AddLog);

// Show Logs
router.get('/ShowLogs/:id',ShowLogs);


// LogStatus
router.put('/LogStatus',LogStatus);

module.exports = router;