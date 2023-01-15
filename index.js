const express=require('express')
const {connection}=require("./config/db")
const {noteRouter} = require('./routes/Note.route')
const {userRouter}=require("./routes/User.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors");

const app=express()

app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to home page")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)



app.listen(3500,async()=>{
    try{
await connection;
console.log("port is running on 3500")
    }
    catch(err){
        console.log("error while connectiog to mongo")
        console.log(err)
    }
    
})


// 63c067554ee7d072cadc81cd