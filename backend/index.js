const express=require("express");
const { connection } = require("./config/db");
const { authenticate } = require("./Middlewares/authentication");
const { notesRouter } = require("./Routes/notesroute");
const { UserRouter } = require("./Routes/routeuser");
const cors=require("cors")
require("dotenv").config()
const app=express();
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/",UserRouter)
app.use(authenticate)

app.use("/notes",notesRouter)
app.listen(process.env.port,async()=>{
    try{
await connection
    }
    catch(err){
        console.log(err)
    }
    console.log("server is running on port "+process.env.port)
})