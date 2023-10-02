const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    image:{
        type:String,
        required:true,
    },
    token:{
        type:String,

    },
    resetPasswordExpires:{
        type:Date,
    }, 
    accountType: {
        type: String,
        enum: ["Admin", "Consumer", "Seller"],
  //      required: true,
}
})

module.exports=mongoose.model("user",userSchema)