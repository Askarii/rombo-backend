const { default: slugify } = require("slugify");
const Product = require("../models/productModel");
const fs = require('fs');


exports.createProductController = async (req, res) => {
    try {
        const {name, description, slug, price, category, quantity, shipping} = req.fields
        const {photo} = req.files
        // Validation
        switch(true){
            case !name: 
                return res.status(404).send({error: "Name is required"})
            case !description: 
                return res.status(404).send({error: "Description is required"})
            case !price: 
                return res.status(404).send({error: "Price is required"})
            case !category: 
                return res.status(404).send({error: "Category is required"})
            case !quantity: 
                return res.status(404).send({error: "Quantity is required"})
            case !shipping: 
                return res.status(404).send({error: "Shipping is required"})
            case photo && photo.size > 100000: 
                return res.status(404).send({error: "Photo is required and should be less than 1Mb"})
                
                
        }
        const newProduct = new Product({...req.fields, slug: slugify(name)})
        if(photo) {
            newProduct.photo.data = fs.readFileSync(photo.path)
            newProduct.photo.contentType = photo.type
        }
        await newProduct.save()
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            newProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while creating product",
            success: false
        })
    }
}

exports.deleteProductController = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product"
        })
    }
}

exports.UpdateProductController = async (req, res) => {
    try {
        const {name, description, slug, price, category, quantity, shipping} = req.fields
        const {photo} = req.files
        // Validation
        switch(true){
            case !name: 
                return res.status(404).send({error: "Name is required"})
            case !description: 
                return res.status(404).send({error: "Description is required"})
            case !price: 
                return res.status(404).send({error: "Price is required"})
            case !category: 
                return res.status(404).send({error: "Category is required"})
            case !quantity: 
                return res.status(404).send({error: "Quantity is required"})
            case !shipping: 
                return res.status(404).send({error: "Shipping is required"})
            case photo && photo.size > 100000: 
                return res.status(404).send({error: "Photo is required and should be less than 1Mb"})
                
                
        }
        const newProduct = await Product.findByIdAndUpdate(req.params.pid, 
            {...req.fields, slug: slugify(name)},
            {new: true}
            )
        if(photo) {
            newProduct.photo.data = fs.readFileSync(photo.path)
            newProduct.photo.contentType = photo.type
        }
        await newProduct.save()
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            newProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while update product",
            success: false
        })
    }
}

exports.getAllProductsController = async (req, res) => {
    try {
        const products = await Product.find({}).populate("category").select("-photo").limit(12).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: "All Products",
            totalCount: products.length,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching products"
        })
    }
}

exports.getProductController = async (req, res) => {
    try {
        const product = await Product.findOne({slug: req.params.slug}).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "Product Fetched Successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching the product"
        })
    }
}

exports.getProductPhotoController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo"
        })
    }
}