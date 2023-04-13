const express = require('express');
const { registerController, loginController } = require('../controllers/authController');

// Route Object
const router = express.Router();

// Register Routes || method POST
router.post(`/register`, registerController)

// Login Routes || method POST
router.post('/login', loginController)

module.exports = router;

