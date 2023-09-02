// routes/order.js

const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Place Order Endpoint
orderRouter.post('/place-order', async (req, res) => {
  try {
    const {userId} = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const orderProducts = cart.items.map((cartItem) => ({
      productId: cartItem.productId._id,
      quantity: cartItem.quantity,
    }));

    const orderTotalPrice = cart.items.reduce(
      (total, cartItem) => total + cartItem.productId.price * cartItem.quantity,
      0
    );

    // Create a new order
    const order = new Order({
      userId,
      products: orderProducts,
      totalPrice: orderTotalPrice,
    });

    await order.save();

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


orderRouter.get('/history', async (req, res) => {
    try {
      const {userId} = req.body; // Assuming you have user data stored in the request object
  
      const orders = await Order.find({ userId }).sort({ orderDate: -1 });
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  
// Order Details by ID Endpoint
orderRouter.get('/:orderId', async (req, res) => {
    try {
      const {userId} = req.body; // Assuming you have user data stored in the request object
      const orderId = req.params.orderId;
  
      const order = await Order.findOne({ _id: orderId, userId });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = {
    orderRouter};
