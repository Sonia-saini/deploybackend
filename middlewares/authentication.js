const { Usermodel } = require("../Models/Usermodel");

// require("dotenv").config();

const jwt = require('jsonwebtoken');


const authentication = async (req, res, next) => {
    let token = req.headers.token;


    if (!token) {
        return res.status(401).send({ message: "Token not found" });
    }
    try {
        const verify = jwt.verify(token, "secret");
        console.log(verify)
        const user = await Usermodel.findOne({_id:verify.userID});
        if (user) {
          
          
            
            next();
        } else {
            res.status(401).send({ message: "Invalid token" });
        }
    } catch (e) {
        res.status(401).send({ message: "Invalid token" });
    }
}

module.exports = authentication;