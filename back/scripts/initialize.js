const mongoose = require('mongoose');
const Product = require('../models/products');
const fs = require('fs');
const { exit } = require('process');

mongoose.connect('mongodb://localhost/products');

console.log('Initializing products...');

// Function to initialize products
const initializeProducts = async () => {
    try {
        // Retrieve all products from the database
        const products = await Product.find();
        // If no products are found, load the products from the json file
        if (products.length === 0) {
            const rawData = fs.readFileSync('./front/src/assets/products.json');
            const productsData = JSON.parse(rawData).data;
            const newProducts = await Product.insertMany(productsData);
            console.log(newProducts, '\n' + newProducts.length + ' Products have been loaded successfully.');
            exit(0);
        } else {
            console.log('Products already loaded');
            console.log('Products: ', products);
            exit(0);
        }
    } catch (err) {
        console.error("Unable to load products from json file: ", err);
        exit(1); // Exit with error code
    }
};

// Call the async function
initializeProducts();
