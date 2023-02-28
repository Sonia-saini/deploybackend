const express = require("express");


const { Postmodel } = require("../Models/Usermodel");










const postRouter = express.Router();
postRouter.use("/post",async(req,res)=>{
    let {name,description,postedAt,price,image,location}=req.body;

try{
let post=new Postmodel({name,description,postedAt,price,image,location});
await post.save();
res.send({data:post})
}
catch(err){
    res.send("post classify have error")
}
})
postRouter.get("/browse",async(req,res)=>{
   const {filter,q,limit,page,sort}=req.query;
try{
    
 if(filter){
const data=await Postmodel.find({category:filter}).limit(limit).skip(page*limit)
console.log(filter)

res.send(data)
}
else if(sort){
    if(sort==="desc"){
    const data=await Postmodel.find({category:filter}).limit(limit).skip(page*limit).sort({postedAt:-1})
    console.log(filter)
    
    res.send(data)  }
    else{
        const data=await Postmodel.find({category:filter}).limit(limit).skip(page*limit).sort({postedAt:1})
        console.log(filter)
        
        res.send(data)    
    } 
}
else{
    if(q){
        const data=await Postmodel.find({name:q}).limit(limit).skip(page*limit)
        res.send(data)
    }else{
    const data=await Postmodel.find().limit(limit).skip(page*limit)
    res.send(data)}
}

}
catch(err){
    res.send("browse classified have error")
}
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
try{
let data=await Postmodel.findByIdAndDelete({_id:id})
res.send({msg:`deleted id ${id}`})
}
catch(err){
    res.send("delete have some error")
}
})
module.exports={postRouter}


