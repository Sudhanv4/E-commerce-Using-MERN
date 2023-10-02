const jwt=require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode);
            req.user=decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating the token"
        })
    }
}

exports.isConsumer = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Consumer") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for consumers",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isSeller = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Seller") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Seller",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};