const Category = require("../models/Category");
const Product=require("../models/Product");
const User = require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader")

exports.createProduct=async(req,res)=>{
    try{
        const {productName,productDescription,price,category}=req.body;
        const thumbnail=req.files.thumbnailImage;
        if(!productName || !productDescription || !price || !thumbnail || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const userId=req.user.id;
        const sellerDetails=await User.findById(userId);
        console.log("Seller Details ",sellerDetails )
        if(!sellerDetails){
            return res.status(404).json({
                success:false,
                message:"Seller details not found"
            })
        }
        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
          return res.status(404).json({
            success: false,
            message: "Category Details Not Found",
          })
        }

        const thumbnailImage=await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
        console.log("Image uplaoded")
        const newProduct=await Product.create({
            productName,
            productDescription,
            seller:sellerDetails._id,
            category: categoryDetails._id,
            price,
            thumbnail:thumbnailImage.secure_url,
        })
        await User.findByIdAndUpdate({_id:sellerDetails._id},
            {
                $push:{
                    products:newProduct._id,
                }
            },
            {new:true},)

            const categoryDetails2 = await Category.findByIdAndUpdate(
                { _id: category },
                {
                  $push: {
                    products: newProduct._id,
                  },
                },
                { new: true }
              )
              console.log("HEREEEEEEEE", categoryDetails2);
              res.status(200).json({
                success: true,
                data: newProduct,
                message: "Product Created Successfully",
              })
        }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Failed to create Product",
            error:error.message,
        })
    }
};

exports.getSellerProducts = async (req, res) => {
    try {
      const sellerId = req.user.id
  
      const sellerProducts = await Product.find({
        seller: sellerId,
      }).sort({ createdAt: -1 })
  
      res.status(200).json({
        success: true,
        data: sellerProducts,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Seller products",
        error: error.message,
      })
    }
  }

exports.getAllProducts=async (req,res)=>{
    try{
        const allProducts=await Product.find({}).populate("seller")
        .exec()
        return res.status(200).json({
            success:true,
            message:"Data for all products fetched successfully",
            data:allProducts,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Cannot fetch Product data",
            error:error.message,
        })
    }
}

exports.getProductDetails=async(req,res)=>{
    try{
        const{productId}= req.body;
        const productDetails=await Product.find(
            {_id:productId},)
            .populate(
                {
                    path:"seller",
                }
            )
            .populate("category")

        if(!productDetails){
            return res.status(400).json({
                success:true,
                message:`Could not find the product with ${productId}`
            })
        }
        return res.status(200).json({
            success:true,
            message:"Product details fetched successfully",
            data:productDetails
        })
        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })
    }
}
exports.deleteProduct = async (req, res) => {
    try {
      const { productId } = req.body
  
      // Find the Product
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(404).json({ message: "Product not found" })
      }
  
      // Unenroll consumers from the Product
      const consumersEnrolled = product.consumersEnrolled
      for (const consumerId of consumersEnrolled) {
        await User.findByIdAndUpdate(consumerId, {
          $pull: { products: productId },
        })
      }
  
     
      // Delete the Product
      await Product.findByIdAndDelete(productId)
  
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }

