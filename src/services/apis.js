const BASE_URL=process.env.REACT_APP_BASE_URL

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }
  

export const categories=  {
    CATEGORIES_API:BASE_URL+"/product/showAllCategories"
}

export const productEndpoints = {
    GET_ALL_PRODUCT_API: BASE_URL + "/product/getAllProducts",
    PRODUCT_CATEGORIES_API: BASE_URL + "/product/showAllCategories",
    CREATE_PRODUCT_API: BASE_URL + "/product/createProduct",
    GET_ALL_SELLER_PRODUCTS_API: BASE_URL + "/product/getSellerProducts",
    DELETE_PRODUCT_API: BASE_URL + "/product/deleteProduct",
  }

  export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_PRODUCTS_API: BASE_URL + "/profile/getEnrolledProducts",
  }

  export const consumerEndpoints = {
    PRODUCT_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  }