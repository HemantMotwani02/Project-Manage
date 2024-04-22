const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {ShowProjects,CreateProject,UpdateProject, Managers} = require('../controller/ProjectController');


// Display Projects
router.get('/projects',verifyToken, ShowProjects);

// Create Project
router.post('/Createproject', verifyToken,CreateProject);

//Edit Project
router.put('/UpdateProject',verifyToken,UpdateProject);

router.get('/UpdateProject',verifyToken,Managers);

module.exports = router;


