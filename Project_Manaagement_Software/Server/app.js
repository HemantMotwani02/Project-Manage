const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const bodyParser = require('body-parser');
const validator = require('validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();

const projectRoutes = require('./router/Project');
const taskRoutes = require('./router/Task');
const logRoutes = require('./router/Log');
const accountRoutes = require('./router/Account');


const port = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:5173', // Change this to match your React app's URL
    credentials: true // Allow credentials (cookies)
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', accountRoutes);
app.use('/project', projectRoutes);
app.use('/task', taskRoutes);
app.use('/log', logRoutes);


app.listen(port, () => { console.log('Server Started at port: ', port) });

