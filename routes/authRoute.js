const express = require('express');
const { registerController, loginController, forgotPasswordController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

// Route Object
const router = express.Router();

// Register Routes || method POST
router.post(`/register`, registerController)

// Login Routes || method POST
router.post('/login', loginController)

// Forgot Password
router.post('/forgot-password', forgotPasswordController)

// Protected User Routes
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
})

// Admin Routes
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})

module.exports = router;

