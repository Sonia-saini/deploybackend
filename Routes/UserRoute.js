const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../Models/Usermodel");
const { loginValidator } = require("../Middlewares/loginvalidate");
const { registerValidator } = require("../Middlewares/Registervalidate");
require("dotenv").config();


const userRouter = express.Router();

userRouter.post("/register",registerValidator, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await Usermodel.find({ email });
  console.log(user.length>0)
 if(user.length===0){  
    bcrypt.hash(password, 8, async (err, password) => {
      if (err) {
        console.log(err);
      } 
      else{
        const user = new Usermodel({
          name,
          email,
          password: password,
        });
        await user.save();
  res.status(201).send("Registration Successful");

      }
      
      
    });
  }else{
    res.send("this email id already exists")
  }
}catch (error) {
    console.log("Some Error occurred, unable to Register.");
    res.status(401).send(error);
  }
});

userRouter.post("/login",loginValidator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hash_password = user[0].password;
    if (user && hash_password) {
      console.log(user,"login id",user[0]._id)
      var token = jwt.sign(
        {userID: user[0]._id},
        process.env.key,
        { expiresIn: "24h" }
      );
      var refreshToken = jwt.sign(
        {userID: user[0]._id},
        process.env.REFRESHKEY,
        { expiresIn: "48h" }
      );
      res.status(200).send({
     msg: "LogIn successfully",
        token: token,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    console.log("Some Error occurred, unable to Login.");
    console.log(error);
  }
});
userRouter.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      return res.status(401).send("unauthorized");
    }
    const verification = jwt.verify(refreshToken, process.env.REFRESHKEY);
    console.log(verification)
    if (verification){
      var newToken = jwt.sign(
        { userID: verification.userID},
        process.env.key,
        { expiresIn: "7 days" }
      );
    }
    res.status(200).send({
    
      
      msg: "Token generated successfully",
      token:newToken,
    });
  } catch (error) {
    res.send("Some Error occurred, unable to refresh token.");
    console.log(error);
  }
});
module.exports = { userRouter };
