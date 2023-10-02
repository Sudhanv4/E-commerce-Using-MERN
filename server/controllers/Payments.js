const Product = require("../models/Product")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")


// verify the payment
exports.verifyPayment = async (req, res) => {

  const products = req.body?.products

  const userId = req.user.id

    await enrollConsumers(products, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { amount } = req.body

  const userId = req.user.id

  if ( !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }
}

// enroll the consumer in the products
const enrollConsumers = async (products, userId, res) => {
  if (!products || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Product ID and User ID" })
  }

  for (const productId of products) {
    try {
        console.log("product ID : ",productId)
      // Find the product and enroll the student in it
      const enrolledProduct= await Product.findOneAndUpdate(
        { _id: productId },
        { $push: { consumersEnrolled: userId } },
        { new: true }
      )

      if (!enrolledProduct) {
        return res
          .status(500)
          .json({ success: false, error: "product not found" })
      }
      console.log("Updated product: ", enrolledProduct)

      
      // Find the consumer and add the product to their list of enrolled products
      const enrolledConsumer = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            products: productId,
          },
        },
        { new: true }
      )

      console.log("Enrolled consumer: ", enrolledConsumer)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledConsumer.email,
        `Successfully purchased ${enrolledProduct.productName}`,
        "Your purchase has been successful"
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}