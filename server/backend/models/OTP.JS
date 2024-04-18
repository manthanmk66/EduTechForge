const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,

    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
            type:Date,
            default:Date.now(),
            index:{
            expires:5*60
            }
        }
    
     
  
});


// A function for Sending Emails
async function senderVerificationEmail(email,otp  ){
    try{
        const mailResponse=await mailSender(email,"Verification Email from StudyNotion",otp);
        console.log("Email Sent Successfully",mailResponse)

    }
    catch(error){
        console.log("Error occured while sending Mails",error)
    }

}

otpSchema.pre("save",async function(next){
    await senderVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema);
