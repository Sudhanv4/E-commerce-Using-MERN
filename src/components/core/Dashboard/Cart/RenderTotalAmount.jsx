import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"

import { BuyProduct } from "../../../../services/operations/consumerFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyProduct = () => {
    const products = cart.map((product) => product._id)
     BuyProduct(token, products, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-slate-900">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyProduct}
        customClasses="w-full  bg-green-300 justify-center"
      />
    </div>
  )
}
