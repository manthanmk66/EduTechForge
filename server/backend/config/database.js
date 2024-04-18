const mongoose = require("mongoose");
require("dotenv").config();

exports.connect(process.env.MONGODB_URL,{

    userNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Database connected successfully");
})
.catch((error)=>{
    console.log("Database connection failed"); 
    console.log(error);
    process.exit(1);
})