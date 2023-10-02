const express = require("express")
const router = express.Router()
const { auth, isSeller } = require("../middlewares/auth")
const {
  
  getAllUserDetails, getEnrolledProducts,

} = require("../controllers/profile")
router.get("/getEnrolledProducts", auth, getEnrolledProducts)

router.get("/getUserDetails", auth, getAllUserDetails)

module.exports = router
