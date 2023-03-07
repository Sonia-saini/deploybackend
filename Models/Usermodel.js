const mongoose=require("mongoose");
const userschema=mongoose.Schema({
    email: String,
 password: String,
 fullname:String,
 admin:Boolean
  
 
})
const Usermodel=mongoose.model("user",userschema);
module.exports={Usermodel}

