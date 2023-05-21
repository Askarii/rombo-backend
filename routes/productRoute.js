const express = require('express');
const formidable = require('express-formidable');
const router = express.Router()
const { requireSignIn, isAdmin} = require('../middlewares/authMiddleware');
const { deleteProductController, createProductController, UpdateProductController, getAllProductsController, getProductController, getProductPhotoController } = require('../controllers/productController');

// Product Routes

// Route for creating products
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// Route for deleting products
router.post('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)

// Route for updating products
router.put('/update-product/:id', requireSignIn, isAdmin, UpdateProductController)

// Route for getting all products
router.get('/all', getAllProductsController);

// Route for getting single product
router.get('/:slug', getProductController);

// Route for getting photo of the product
router.get('/product-photo/:pid', getProductPhotoController)

module.exports = router;