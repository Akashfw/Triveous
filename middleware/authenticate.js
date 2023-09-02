var jwt = require('jsonwebtoken');
const fs = require("fs")
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
   
    if(!token){
        res.status(401).send("login again")
    }
   
  

    jwt.verify(token, 'masai', function(err, decoded) {
            if(err){
                res.send({"msg":"plz login first","err":err.message})
            }
            else{
                req.body.userId=decoded.userID
                next()
            }
      });

}




module.exports = {authenticate}