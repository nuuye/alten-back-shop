const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    id: { type: Number },
    code: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    inventoryStatus: { type: String },
    category: { type: String },
    image: { type: String },
    rating: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);