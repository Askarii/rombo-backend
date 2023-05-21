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
App.use(cors())

App.use(express.json())
App.use(morgan("dev"))

// Rest Api
App.use('/api/v1/auth', authRoutes)
App.use('/api/v1/category', require('./routes/categoryRoute'))
App.use('/api/v1/product', require('./routes/productRoute'))

App.get("/", (req, res) => {
    res.send("haha haha");
})

// Listening Port
const port = process.env.PORT || 5000;

App.listen(port, () => {
    console.log(`Server listening on port ${port}`.bgCyan.white);
})