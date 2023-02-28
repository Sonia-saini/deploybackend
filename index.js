const express=require("express");
const { connection } = require("./configs/db");
const cors=require("cors");
const { postRouter } = require("./Routes/Postroute");



const app=express();
app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome homepage")
})
app.use("/",postRouter)


app.listen("3400",async()=>{
    try{
        await connection
        console.log("connect to db")
    }
    catch(err){
        console.log("unable to connnect to database")
    }
    console.log("server is running on port 3400")
})

