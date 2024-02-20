const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const fs = require('fs');

//Getting all the products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Getting one product
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});

//Creating one product
router.post('/', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        inventoryStatus: req.body.inventoryStatus,
        category: req.body.category,
        image: req.body.image,
        rating: req.body.rating
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Creating multiple products
router.post('/multiple', async (req, res) => {
    try {
        const newProducts = await Product.insertMany(req.body);
        res.status(201).json(newProducts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Import products from a file
router.post('/import', async (req, res) => {
    try {
        // Read the JSON file
        const rawData = fs.readFileSync('products.json');
        const productsData = JSON.parse(rawData).data;

        // Map the products data to Product model and save them
        const newProducts = await Product.insertMany(productsData);

        res.status(201).json(newProducts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Updating one product
router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.quantity != null) {
        res.product.quantity = req.body.quantity;
    }
    if (req.body.inventoryStatus != null) {
        res.product.inventoryStatus = req.body.inventoryStatus;
    }
    if (req.body.category != null) {
        res.product.category = req.body.category;
    }
    if (req.body.image != null) {
        res.product.image = req.body.image;
    }
    if (req.body.rating != null) {
        res.product.rating = req.body.rating;
    }
    if (req.body.code != null) {
        res.product.code = req.body.code;
    }
    if (req.body.id != null) {
        res.product.id = req.body.id;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

//Deleting one product
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}

module.exports = router;