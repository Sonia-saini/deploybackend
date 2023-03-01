const mongoose=require("mongoose");
// require("dotenv").config();
const connection=mongoose.connect(`mongodb+srv://soniasaini:soniasaini@cluster0.neg6vl9.mongodb.net/?retryWrites=true&w=majority`)
module.exports={connection}