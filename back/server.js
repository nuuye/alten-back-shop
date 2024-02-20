require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.error('Error connecting to MongoDB:', error));
db.once('open', () => console.log('Connected to MongoDB'));


app.use(express.json());

const productsRouter = require('./routes/products');

// Enable CORS for all routes
app.use(cors());

app.use('/products', productsRouter);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
}); 