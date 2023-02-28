const mongoose=require("mongoose");
const userschema=mongoose.Schema({
    name: String,
  description: String,
  image: String,
  category:String,
  location:String,
  postedAt:String,
  price:String,
})
const Postmodel=mongoose.model("post",userschema);
module.exports={Postmodel}
// "name": "Nike Air",
// 		"description" : "Almost brand new, rarely used",
// 		"category" : "clothing",
// 		"image" : "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7fbc5e94-8d49-4730-a280-f19d3cfad0b0/custom-nike-air-max-90-by-you.png",
// 		"location" : "india",
// 		"postedAt" : "2023-02-01",
// 		"price" : "7999"