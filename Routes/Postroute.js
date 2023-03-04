const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../Models/Usermodel");
const { registerValidator } = require("../middlewares/registervalidate");
const { loginValidator } = require("../middlewares/loginvalidate");
require("dotenv").config();


const userRouter = express.Router();

userRouter.post("/signup", registerValidator, async (req, res) => {
  const {  email, password } = req.body;
  try {
    bcrypt.hash(password, 8, async (err, password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new Usermodel({
         
            
          email,
          password: password,
        });
        await user.save();
      }
    });
  } catch (error) {
    console.log("Some Error occurred, unable to Register.");
    console.log(error);
  }
  res.status(201).send("Registration Successful");
});

userRouter.post("/login", loginValidator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "backend", {
            expiresIn: "1h",
          });
          res.status(201).send({ msg: "Login Successful", token: token ,user:user});
        } else {
          res.status(400).send("Wrong credentials, please try again.");
        }
      });
    }
  } catch (error) {
    console.log("Some Error occurred, unable to Login.");
    console.log(error);
  }
});

module.exports = { userRouter };