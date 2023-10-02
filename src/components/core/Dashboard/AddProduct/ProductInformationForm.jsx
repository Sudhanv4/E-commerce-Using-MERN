import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addProductDetails,
  editProductDetails,
  fetchProductCategories,
} from "../../../../services/operations/ProductDetailsAPI"
import { setProduct, setStep } from "../../../../slices/productSlice"
// import { Product_STATUS } from "../../../../utils/constants"
import IconBtn from "../../../common/IconBtn"
import Upload from "./Upload"
import { useNavigate } from "react-router-dom"
// import ChipInput from "./ChipInput"
// import RequirementsField from "./RequirementsField"

export default function ProductInformationForm() {

  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { product, editProduct } = useSelector((state) => state.product)
  const [loading, setLoading] = useState(false)
  const [productCategories, setProductCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchProductCategories()
      if (categories.length > 0) {
        // console.log("categories", categories)
        setProductCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editProduct) {
      // console.log("data populated", editProduct)
      setValue("productTitle", product.productName)
      setValue("productShortDesc", product.productDescription)
      setValue("productPrice", product.price)
      setValue("productCategory", product.category)
      setValue("productImage", product.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.productTitle !== product.productName ||
      currentValues.productShortDesc !== product.productDescription ||
      currentValues.productPrice !== product.price ||
      currentValues.productCategory._id !== product.category._id ||
      currentValues.productImage !== product.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editProduct) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now Product:", Product)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("productId", product._id)
        if (currentValues.productTitle !== product.productName) {
          formData.append("productName", data.productTitle)
        }
        if (currentValues.productShortDesc !== product.productDescription) {
          formData.append("productDescription", data.productShortDesc)
        }
        if (currentValues.productPrice !== product.price) {
          formData.append("price", data.productPrice)
        }
        if (currentValues.productCategory._id !== product.caproduct._id) {
          formData.append("category", data.productCategory)
        }
        if (currentValues.productImage !== product.thumbnail) {
          formData.append("thumbnailImage", data.productImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editProductDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setProduct(result))
          navigate("/my-list")
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("productName", data.productTitle)
    formData.append("productDescription", data.productShortDesc)
    formData.append("price", data.productPrice)
    formData.append("category", data.productCategory)
    formData.append("thumbnailImage", data.productImage)
    setLoading(true)
    const result = await addProductDetails(formData, token)
    if (result) {
      dispatch(setProduct(result))
      navigate("/dashboard/my-products")
      
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[3px] w-[70%] border-richblack-700 bg-slate-100 p-6"
    >
      {/* product Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productTitle">
          Product Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="productTitle"
          placeholder="Enter product Title"
          {...register("productTitle", { required: true })}
          className="rounded-lg bg-slate-200 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"
        />
        {errors.productTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product title is required
          </span>
        )}
      </div>
      {/* product Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productShortDesc">
          Product Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="productShortDesc"
          placeholder="Enter Description"
          {...register("productShortDesc", { required: true })}
          className="rounded-lg bg-slate-200 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none resize-x-none min-h-[130px] w-full"
        />
        {errors.productShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Description is required
          </span>
        )}
      </div>
      {/* product Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productPrice">
          Product Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="productPrice"
            placeholder="Enter product Price"
            {...register("productPrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="rounded-lg bg-slate-200 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.productPrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Price is required
          </span>
        )}
      </div>
      {/* product Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productCategory">
          Product Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("productCategory", { required: true })}
          defaultValue=""
          id="productCategory"
          className="rounded-lg bg-slate-200 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            productCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.productCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Category is required
          </span>
        )}
      </div>
    
      {/* Product Thumbnail Image */}
      <Upload
        name="productImage"
        label="Product Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editProduct ? product?.thumbnail : null}
      />
      {/* Benefits of the Product */}
      
      
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editProduct && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Save Changes
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={"Save"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
