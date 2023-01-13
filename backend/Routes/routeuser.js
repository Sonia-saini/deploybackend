const express=require("express");
const { UserModel } = require("../models/useer");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const UserRouter=express.Router();
UserRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age}=req.body;
    try{
        bcrypt.hash(pass, 8, async (err, hash)=>{
            const user=new UserModel({name,email,pass:hash,age})
            await user.save()
            res.send("Registered")
            });
    }
    catch(err){
        console.log(err)
        res.send("error posting")
    }
})
UserRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.find({email});
        if(user.length>0){
        bcrypt.compare(pass, user[0].pass, function(err, result) {
        if(result){
        const token = jwt.sign({ userID:user[0]._id },'masai');
        res.send({"msg":"Login Successfull","token":token})
        } else {res.send("Wrong Credntials")}
        });
        } else {
        res.send("Wrong Credntials")
        }
        } catch(err){
        res.send("Something went wrong")
        console.log(err)
        }
        
        })
        
        UserRouter.get("/data",(req,res)=>{
            var token=req.headers.authorization
jwt.verify(token,"masai", (err,decoded )=>{
if(err){
res.send("Invalid Token")
console.log(err)
} else {
res.send("Whatever you want can be sent over here")
}
})
        })
module.exports={
    UserRouter
}