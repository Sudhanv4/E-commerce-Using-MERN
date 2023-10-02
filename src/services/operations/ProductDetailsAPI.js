import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewProductSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { productEndpoints } from "../apis"

const {
  PRODUCT_CATEGORIES_API,
  GET_ALL_PRODUCT_API,
  CREATE_PRODUCT_API,
  EDIT_PRODUCT_API,
  GET_ALL_SELLER_PRODUCTS_API,
  DELETE_PRODUCT_API,

} = productEndpoints

export const getAllProducts = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_PRODUCT_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_Product_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



// fetching the available Product categories
export const fetchProductCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", PRODUCT_CATEGORIES_API)
    console.log("Product_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("Product_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// add the Product details
export const addProductDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Product Details")
    }
    toast.success("Product Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the Product details
export const editProductDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT Product API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Product Details")
    }
    toast.success("Product Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT Product API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all Products under a specific Seller
export const fetchSellerProducts = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_SELLER_PRODUCTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("Seller ProductS API RESPONSE............", response.data.data)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Seller Products")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("Seller ProductS API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a Product
export const deleteProduct = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_PRODUCT_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE Product API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Product")
    }
    toast.success("Product Deleted")
  } catch (error) {
    console.log("DELETE Product API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

