const User = require("../models/Users");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");   

// SendOTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(400).json({
        message: "User already Registered",
      });
    }

    let generatedOTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP Generated", generatedOTP);

    let result = await OTP.findOne({ otp: generatedOTP });
    while (result) {
      generatedOTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: generatedOTP });
    }

    const otpPayload = { email, otp: generatedOTP };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    return res.status(200).json({
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Signup
exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (!firstname || !email || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirmpassword does not match, please try again",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already Registered",
      });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp.length === 0 || otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/8.x/initials/svg?seed=${firstname} ${lastname}`,
    });

    return res.status(200).json({
      success: true,
      message: "User is Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot be Registered. Please try Again",
    });
  }
};

// Login

exports.login =async(req,res)=>{
  try{
    // get data from req body

    const {email , password}=req.body;

    //validation data
    if(!email || !password){
      return res.status(403).json({
        success:false,
        message:"All Fields are Required Please Try Again"
      });
    }
     //user check exist or not

    const user =await User.findOne({email}).populate("additionalDetails");
    if(!user){
      return res.status(401).json({
        success:true,
        message:"User is Not Registered",

      })
    }
   
    //generate JWT,after password matching             
      if (await bcrypt.compare(password, user.password)){ 
        const payload={
          email:user.email,
          id:user,_id,
          accountType:user.accountType,

        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"2 h"
           
        });
        user.token=token;
        user.password=undefined;

            //create cookie and send response

            const options={
              expires:new (Date.now() + 3*34*60*60*100),
              httponly:true  
            }

        res.cookie("token",toekn,options).status(200).json({
          success:true,
            token,
            user,
            message:"Logged In Successfully"
        })
        
        
      }
      else{
        return res.status(401).json({
          success:true,
          token,
          user,
          message:"Logged In Successfully",
        })
      }

  }catch(error){
    console.Console.log(error);
    return res.status(500).json({
      success:true,
      message:"Login Failure"
    });


  }
};



//changePassword
