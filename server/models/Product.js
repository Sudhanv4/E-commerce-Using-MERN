const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
    },
    productDescription:{
        type:String,
    },
    ratingAndReview:{
        type:Number,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
       // required:true
    },
    consumersEnrolled: [
        {
          type: mongoose.Schema.Types.ObjectId,
         // required: true,
          ref: "user",
        },
      ],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Category",
      },
});
module.exports=mongoose.model("Product",productSchema)