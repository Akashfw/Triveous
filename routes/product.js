// routes/product.js

const express = require('express');
const productRoutes = express.Router();
const Product = require('../models/Product');
const Category= require("../models/Category");

// add product in db
productRoutes.post('/', async (req, res) => {
    try {
      const { title, price, description, availability, categoryId } = req.body;
  
      // Check if the specified category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      const newProduct = new Product({
        title,
        price,
        description,
        availability,
        category: categoryId,
      });
  
      await newProduct.save();
      res.status(200).send({"msg":"New product added", newProduct});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// Product Listing by Category Endpoint
productRoutes.get('/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId })
      .select('title price description availability')
      .populate('category', 'name'); // Populate category information

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


productRoutes.get('/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = {
    productRoutes
};
