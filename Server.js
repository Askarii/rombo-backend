const colors = require('colors');
const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const connections = require('./config/database');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoute.js')
const cors = require('cors');


// Env configuration
dotenv.config()

// Database connections
connections()

// App initialization
const App = express()

// Middlewares

App.use(express.json())
App.use(cors())
App.use(morgan("dev"))

// Rest Api
App.use('/api/v1/auth', authRoutes)
App.get("/", (req, res) => {
    res.send("haha haha");
})

// Listening Port
const port = process.env.PORT || 5000;

App.listen(port, () => {
    console.log(`Server listening on port ${port}`.bgCyan.white);
})