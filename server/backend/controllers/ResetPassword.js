const crypto = require('crypto');
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
exports.resetPasswordToken = async (req, res) => {
    try {
        // Get email from request body
        const email = req.body.email;

        // Check if user exists for this email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: "Your Email is not Registered With us" });
        }

        // Generate token 
        const token = crypto.randomUUID();

        // Update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        // Create URL
        const url = `http://localhost:3000/update-password/${token}`;

        // Send mail containing the URL
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);

        // Return response
        return res.json({
            success: true,
            message: "Password Reset Link has been sent to your email"
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};


exports.resetPassword=async(req,res)=>{


    try{
             // data fetch

     const {password, confirmedPassword,token}=req.body;

     //validation  
     if(!password!==confirmPassword){
        return res.json({
            success:false,
            message:"Password and Confirm Password do not match"
        })
     }

     //get userDetailsfrom db using token
     const userDetails=await user.findOne({token:token});
     
     //if no entry- invalid Token
     if(!userDetails){
        return res.json({
            success:false,
            message:"Invalid Token",
        });
     }

     //token time check
     if(userDetails.resetPasswordExpires < Date.now() ){
        return res.json({
            success:false,
            message:"Token is Expired please generate your Token",
        })
     }

     //hash pwd

     const hashedPassword=await bcrypt.hash(password,10);


     //password update
     await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
     );

     //return response
     return res.status(200).json({
        success:true,
        message:"Password reset Successfull"
     })
     


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong";

    })
    }

      
}
 