const express=require("express");
const cors=require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/UserRoute");
const authentication = require("./Middlewares/authentication");
// require("dotenv").config();

let app=express();
app.use(cors());
app.use(express.json())
app.get("/",authentication,(req,res)=>{
    res.send("welcome pococare")
})
app.use("/",userRouter)
app.listen(3003,async()=>{
    try{
await connection
console.log("db is connected")
    }
    catch(err){
        console.log("db connection have error")
    }
    console.log(`server is running on port ${3003}`)
})
