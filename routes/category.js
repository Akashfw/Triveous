// routes/category.js

const express = require('express');
const categoryRoutes = express.Router();
const Category = require('../models/Category');

// Category Listing Endpoint
categoryRoutes.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// add category
categoryRoutes.post('/', async (req, res) => {
    try {
      const { name } = req.body;
      const newCategory = new Category({ name });
      await newCategory.save();
      res.send({"msg":"New category added", newCategory});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = {
    categoryRoutes
};
