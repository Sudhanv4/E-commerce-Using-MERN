import { useEffect, useState } from "react"
// import ProgressBar from "@ramonak/react-progress-bar"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserDetails, getUserEnrolledProducts } from "../../../services/operations/profileAPI"
import { setLoading } from "../../../slices/profileSlice"
import { apiConnector } from "../../../services/apiConnector"

export default function EnrolledProducts() {
  const { token } = useSelector((state) => state.auth)
  const {loading} =useSelector((state)=>state.profile)
  const { user } = useSelector((state) => state.profile)

  const navigate = useNavigate()

  const [enrolledProducts, setEnrolledProducts] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledProducts(token) // Getting all the published and the drafted products

        // Filtering the published product out
        // const filterPublishproduct = res.filter((ele) => ele.status !== "Draft")
        // console.log(
        //   "Viewing all the couse that is Published",
        //   filterPublishproduct
        // )
        setEnrolledProducts(res)
      } catch (error) {
        console.log("Could not fetch enrolled products.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <>
      <div className="text-3xl text-richblack-50"> Products purchased</div>
      {!enrolledProducts ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledProducts.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not purchased any product yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Product Name</p>
            <p className="w-1/4 px-2 py-3"></p>
            <p className="flex-1 px-2 py-3">Purchased</p>
          </div>
          {/* product Names */}
          {enrolledProducts.map((product, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] items-center gap-4 px-5 py-3"
               
              >
                <img
                  src={product.thumbnail}
                  alt="product_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{product.productName}</p>
                  <p className="text-xs text-richblack-300">
                    {product.productDescription.length > 50
                      ? `${product.productDescription.slice(0, 50)}...`
                      : product.productDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3"></div>
              <div className="flex  justify-center  w-1/5 flex-col gap-2 px-8 py-3">
                <RiVerifiedBadgeFill className="text-green-500"/>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
