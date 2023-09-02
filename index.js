const express = require("express");
const { connection } = require("./config/db");
const app = express();
const {userRoute}= require("./routes/userRoutes");
const {categoryRoutes} = require('./routes/category');
const {productRoutes} = require('./routes/product');
const {authenticate}= require("./middleware/authenticate");
const {cartRouter} = require('./routes/cart');
const {orderRouter} = require('./routes/order');
require("dotenv").config();
app.use(express.json());


app.get("/", (req,res)=>{
    res.status(200).send("HOME PAGE")
});


app.use("/api/user", userRoute);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use(authenticate);

app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);




app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log(err);
        console.log("Unable to Connect to Server")
    }
    console.log("Server is Running on Port "+" "+process.env.port)
})