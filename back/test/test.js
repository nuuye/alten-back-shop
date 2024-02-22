const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Product Routes', () => {
    let productID;
    const newProduct = {
        id: 1,
        code: "595959",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5
    };

    it('should fetch all products', async () => {
        const res = await request(app)
            .get('/products')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new product', async () => {
        const res = await request(app)
            .post('/products')
            .send(newProduct)
        productID = res.body._id;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id', newProduct.id);
    });

    it('should fetch a single product', async () => {
        const res = await request(app)
            .get(`/products/${productID}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', newProduct.id);
    })

    it('should update a product', async () => {
        const res = await request(app)
            .patch(`/products/${productID}`)
            .send({ name: "Bamboo Watch Updated" })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Bamboo Watch Updated');
    });

    it('should delete a product', async () => {
        const res = await request(app)
            .delete(`/products/${productID}`)
        expect(res.statusCode).toEqual(200);
    });

    afterAll(done => {
        // Closing the DB connection
        mongoose.connection.close();
        done();
    })

});