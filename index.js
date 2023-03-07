const express=require("express");
const { connection } = require("./configs/db");
const cors=require("cors");
const {  userRouter } = require("./Routes/Postroute");
const { Jobroute } = require("./Routes/Jobroute");



const app=express();
app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome homepage")
})
app.use("/",userRouter)
app.use("/",Jobroute)


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

