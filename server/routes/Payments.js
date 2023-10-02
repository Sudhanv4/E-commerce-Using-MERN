// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  // verifySignature,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payments")
const { auth, isSeller, isConsumer, isAdmin } = require("../middlewares/auth")
router.post("/verifyPayment", auth, isConsumer, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isConsumer,
  sendPaymentSuccessEmail
)
// router.post("/verifySignature", verifySignature)

module.exports = router
