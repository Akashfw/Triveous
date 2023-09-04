
const bcrypt= require("bcrypt");
const express= require("express");
const jwt= require("jsonwebtoken");
const userRoute= express.Router();
const {Usermodel}= require("../models/Usermodel");


userRoute.post("/register", async(req,res)=>{
    const {name,email,password}=req.body;

    try {
        bcrypt.hash(password,6,async(err,hash)=>{
            const user= new Usermodel({name,email,password:hash});
            await user.save();
            res.status(200).send("User Registered Successfully");
        })
    } catch (err) {
        res.status(500).send("Unable to register User");
        console.log(err);
    }
});


userRoute.post("/login", async(req,res)=>{
    
    const {email,password}= req.body;

    try {
        const user = await Usermodel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password, (err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},"masai",{expiresIn:"1d"});
                    res.status(200).send({"msg":"login Successful", "token":token});
                }else{
                    res.status(400).send("wrong Credentials")
                }
            })
        }else{
            res.status(400).send("wrong Credentials")
        }
    } catch (err) {
        res.status(500).send("Unable to login");
        console.log(err);
    }
});

module.exports={
    userRoute
}