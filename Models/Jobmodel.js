const mongoose=require("mongoose");
const jobschema=mongoose.Schema({
    name: String,
 position: String,
 location:String,
 contract:String
  
 
})
const Jobmodel=mongoose.model("admin",jobschema);
module.exports={Jobmodel}

