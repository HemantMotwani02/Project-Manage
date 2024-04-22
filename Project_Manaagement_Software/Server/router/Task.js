const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {CreateTasks,GetTask} = require('../controller/TaskController');


// Create Task
router.post('/CreateTask',verifyToken,CreateTasks);

// Get Task
router.get('/tasks',verifyToken, GetTask);

module.exports = router;