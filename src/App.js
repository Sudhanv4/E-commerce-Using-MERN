import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledProducts from "./components/core/Dashboard/EnrolledProducts";
import AddProduct from "./components/core/Dashboard/AddProduct";
import MyProducts from "./components/core/Dashboard/MyProducts";



function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=" bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="login"
          element={

            <Login />

          }
        />
        <Route
          path="forgot-password"
          element={

            <ForgotPassword />

          }
        />
        <Route
          path="update-password/:id"
          element={
            <UpdatePassword />
          }
        />

        <Route
          path="signup"
          element={
            <Signup />
          }
        />
        <Route
          path="verify-email"
          element={
            <VerifyEmail />
          }
        />


        <Route
          path="dashboard"

          element={
            <Dashboard />
          }>
        
        {user?.accountType === ACCOUNT_TYPE.CONSUMER && (
            <>
              <Route
                path="/dashboard/my-list"
                element={<EnrolledProducts />}
              />
              <Route path="/dashboard/cart" element={<Cart/>} />
            </>
          )}

            {user?.accountType === ACCOUNT_TYPE.SELLER && (
            <>
              <Route path="/dashboard/my-products" element={<MyProducts/>} />

              <Route path="/dashboard/add-product" element={<AddProduct />} />
              
            </>
          )}

</Route>





          <Route path="*" element={<Error />} />

      </Routes>
    </div>
  );
}

export default App;
