const OTP=require("../models/OTP");
const User = require("../models/User");
const otpGenerator=require("otp-generator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.sendotp = async (req, res) => {
    try {
      const { email } = req.body
  
      // Check if user is already present
      // Find user with provided email
      const checkUserPresent = await User.findOne({ email })
      // to be used in case of signup
  
      // If user found with provided email
      if (checkUserPresent) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is Already Registered`,
        })
      }
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      const result = await OTP.findOne({ otp: otp })
      console.log("Result is Generate OTP Func")
      console.log("OTP", otp)
      console.log("Result", result)
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        })
      }
      const otpPayload = { email, otp }
      const otpBody = await OTP.create(otpPayload)
      console.log("OTP Body", otpBody)
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
  }

exports.signup=async(req,res)=>{
   try{
    const {
        firstName,
        lastName,
        email,
        password,
        accountType,
        confirmPassword,
        otp
    }=req.body;
    if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp){
        return res.status(403).json({
            success:false,
            message:"Password and Confirm Password value does not match, please try again"
        })
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User is already registered",
        });
    }

    const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);

    if(recentOtp.length==0){
        return res.status(400).json({
            success:false,
            message:"OTP not Found",
        })
    }else if(otp!==recentOtp[0].otp){
        return res.status(400).json({
            status:false,
            message:"Invalid OTP"
        })
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const user=await User.create({
        firstName,lastName,email,accountType,password:hashedPassword,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })
    return res.status(200).json({
        success:true,
        message:"User is registered Successfully",
        user,
    });
   }
   catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"User cannot be registered. Please try again"
    })
   }
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({
          success: false,
          message: `User is not Registered, Please SignUp to Continue`,
        })
      }
  
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, accountType: user.accountType },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        user.token = token
        user.password = undefined
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }

exports.changePassword=async (req,res)=>{
    
}