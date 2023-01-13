const express=require("express");
const {NoteModel}=require("../models/notesmodel")
const notesRouter=express.Router()
//for all the following things authentication is required.
notesRouter.get("/", async(req,res)=>{
//logic to get the notes
try{
let data=await NoteModel.find();
res.send(JSON.stringify(data))
}catch(err){
    console.log(err)
}
})
notesRouter.post("/create", async (req,res)=>{
const payload=req.body
const new_note=new NoteModel(payload)
await new_note.save()
res.send({"msg":"Note Created"})
})
notesRouter.patch("/update/:noteID", async(req,res)=>{
    const Id=req.params.noteID;
    const userID=await NoteModel.find({_id:Id}).userID
    const data=req.body;
    console.log(userID)
        try{
    if(req.body.userID!==userID){
res.send({"msg":"you are not authorized"})
    }
    else{
        let update=await NoteModel.findByIdAndUpdate({_id:Id},data)
        console.log(update)
        res.send(`updated data ${Id}`)
    }
    
        }catch(err){
            console.log(err)
            res.send(err)
        }
//logic to update the notes
})
notesRouter.delete("/delete/:noteID",async(req,res)=>{
//logic to delete the notes
const Id=req.params.noteID;
    const userID=await NoteModel.find({_id:Id}).userID
    try{
        if(req.body.userID!==userID){
            res.send({"msg":"you are not authorized"})
                }
                else{
                    let update=await NoteModel.findByIdAndDelete({_id:Id})
                    console.log(update)
                    res.send(`deleted data ${Id}`)
                }

    }catch(err){
        console.log(err)
        res.send("error deleting")
    }
})
module.exports={
notesRouter
}
