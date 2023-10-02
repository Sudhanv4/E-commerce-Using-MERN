// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Product Controllers Import
const {
  createProduct,
  getAllProducts,
  getProductDetails,
  getFullProductDetails,
  editProduct,
  getSellerProducts,
  deleteProduct,
} = require("../controllers/Product")

// Tags Controllers Import

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import


// Sub-Sections Controllers Import


// Rating Controllers Import


// Importing Middlewares
const { auth, isSeller, isConsumer, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Product routes
// ********************************************************************************************************

// Products can Only be Created by Sellers
router.post("/createProduct", auth, isSeller, createProduct)
// Edit Product routes

//router.post("/editProduct", auth, isSeller, editProduct)

//Add a Section to a Product


// Get all Products Under a Specific Seller

router.get("/getSellerProducts", auth, isSeller, getSellerProducts)

// Get all Registered Products
router.get("/getAllProducts", getAllProducts)
// Get Details for a Specific Products
// Get Details for a Specific Products

//router.post("/getFullProductDetails", auth, getFullProductDetails)

// To Update Product Progress
// To get Product Progress
// router.post("/getProgressPercentage", auth, isStudent, getProgressPercentage)
// Delete a Product

//router.delete("/deleteProduct", deleteProduct)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)
router.delete("/deleteProduct", deleteProduct)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

module.exports = router
