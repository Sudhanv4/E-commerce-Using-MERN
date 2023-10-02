import { toast } from "react-hot-toast"

// import rzpLogo from "../../assets/Logo/forRazorpay.png"
import { resetCart } from "../../slices/cartSlice"
// import { setPaymentLoading } from "../../slices/courseSlice"
import { apiConnector } from "../apiConnector"
import { consumerEndpoints } from "../apis"

const {
  PRODUCT_VERIFY_API,
} = consumerEndpoints

// Buy the Product
export async function BuyProduct(
  token,
  products,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...")
  try {
    // sendPaymentSuccessEmail({success:true}, 565, token)
    verifyPayment({ products }, token, navigate, dispatch)
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error("Could Not make Payment.")
  }
  toast.dismiss(toastId)
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Ordering")
  // dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector("POST", PRODUCT_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful. We will deliver your product shortly ")
    navigate("/dashboard/my-list")
    dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error("Could Not Verify Payment.")
  }
  toast.dismiss(toastId)
  // dispatch(setPaymentLoading(false))
}


