const jwt = require("jsonwebtoken");

const authenticate= (req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
        const decode = jwt.verify(token,"masai");
        if(decode){
            req.userid= decode.userID;
            next()
        }else{
            res.status(400).send("please login first")
        }
    }else{
        res.status(500).send("please login first");
    }
}

module.exports={
    authenticate
}