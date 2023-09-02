// routes/cart.js

const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add Product to Cart Endpoint
cartRouter.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart; if so, update quantity
    const cartItem = cart.items.find((item) => item.productId.toString() === productId);
    if (cartItem) {
      cartItem.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// View Cart Endpoint
cartRouter.get('/', async (req, res) => {
  try {
    const {userId} = req.body;
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'title price');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Cart Item Quantity Endpoint
cartRouter.put('/update/:cartItemId', async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { 'items._id': cartItemId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove Cart Item Endpoint
cartRouter.delete('/remove/:cartItemId', async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;

    const cart = await Cart.findOneAndUpdate(
      {},
      { $pull: { items: { _id: cartItemId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
    cartRouter
};
