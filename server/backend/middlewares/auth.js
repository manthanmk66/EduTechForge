const jwt =require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User")

//auth

exports.auth=async(req,res,next)=>{
    try{

        //extract token
        c
        const token=req.header("Authorization").replace("Bearer","") || req.cookies.token || req.body.token;

        //if token ismissing
        if(!token) return res.status(400)
        .json(
        {
            success:false,
            message:"Invalid Authentication"})

            //verify the token

            try{
                const decode=await jwt.verify(token,process.env.JWT_SECRET);
                console.log(decode);
                req.user=decode;

            }
            catch(error){
                return res.status(400).json({
                    success:false,
                    message:"token is invalid"
                });

            }
            next();
        

         

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something Went wrong while validating the toekn"
        })

    }


}


//isStudent


exports.isStudent=async(req,res,next)=>{

    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to access this route"

            })
        }
        next();


    }
    catch(error){
    return res.status(500).json({
        success:false,
        message:"User Role Cannot be Verified please try again"
    })
}

       
}


//isAdmin


exports.isAdmin=async(req,res,next)=>{

    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to access this route"

            })
        }
        next();


    }
    catch(error){
    return res.status(500).json({
        success:false,
        message:"User Role Cannot be Verified please try again"
    })
}

       
}