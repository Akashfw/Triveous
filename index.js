const express = require("express");
const { connection } = require("./config/db");
const app = express();
const {userRoute}= require("./routes/userRoutes")
require("dotenv").config();
app.use(express.json());


app.get("/", (req,res)=>{
    res.status(200).send("HOME PAGE")
});
app.use("/api",userRoute);
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