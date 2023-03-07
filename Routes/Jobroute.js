const express = require("express");


const { Jobmodel } = require("../Models/Jobmodel");
const Jobroute=express.Router();
Jobroute.post("/jobpost",async(req,res)=>{
    const {name,location,contract,position}=req.body;
  try{
let x=new Jobmodel({name,location,contract,position})
await x.save();
res.send("new job posted")
  } 
  catch(err){
res.send("new job post req have some error")
  } 
})
Jobroute.patch("/jobpost/:id",async(req,res)=>{
    const {id}=req.params
    // const {name,location,contract,position}=req.body;
  try{
let data=await Jobmodel.findByIdAndUpdate({_id:id},req.body)
    
res.send("job updated")
  } 
  catch(err){
res.send("job patch req have some error")
  } 
})
Jobroute.delete("/jobpost/:id",async(req,res)=>{
    const {id}=req.params
    // const {name,location,contract,position}=req.body;
  try{
let data=await Jobmodel.findByIdAndDelete({_id:id})
    
res.send("job deleted")
  } 
  catch(err){
res.send("job delete req have some error")
  } 
})
Jobroute.get("/jobs",async(req,res)=>{
    const {filter,q,limit,page,filter1}=req.query;
try{
    
 if(filter){
const data=await Jobmodel.find({location:filter}).limit(limit).skip(page*limit)
console.log(filter)

res.send(data)
}else if(filter1){
   
    
    const data=await Jobmodel.find({contract:filter1}).limit(limit).skip(page*limit).sort({postedAt:-1})
    console.log(filter)
    
    res.send(data) 
        
    
}
else{
    if(q){
        const data=await Jobtmodel.find({name:q}).limit(limit).skip(page*limit)
        res.send(data)
    }else{
    const data=await Jobmodel.find().limit(limit).skip(page*limit)
    res.send(data)}
}

}
catch(err){
    res.send("job getting error")
}

})

module.exports = { Jobroute };