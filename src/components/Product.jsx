import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { ACCOUNT_TYPE } from "../utils/constants";


const Product = ({ item }) => {
  const { cart } = useSelector((state) => state.cart);
  const {user}=useSelector((state)=>state.profile)
  const dispatch = useDispatch();

  const addToTheCart = () => {
        if(!user){
            toast.error("Please login first")
            return
        }
        if (user && user?.accountType === ACCOUNT_TYPE.SELLER) {
          toast.error("You are a seller. You can't buy a product.")
          return
        }


    dispatch(addToCart(item));
  };

  const removeFromTheCart = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
    <>
      <div className="group hover:scale-110 transition duration-300 ease-in flex flex-col items-center justify-between shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0_10px_20px_rgba(238,_113,_14,_0.2)] gap-3 p-4 mt-10 ml-5  rounded-xl">
        {/* https://manuarora.in/boxshadows -> From Here we can take  */}
        <div>
          <h1 className="truncate w-40 mt-1 text-gray-700 font-semibold text-lg  text-left">{item.productName}</h1>
        </div>
        <div>
          <h1 className=" w-40 text-gray-400 font-normal text-[10px] text-left">
            {item.productDescription.split(" ").slice(0, 10).join(" ") + "..."}
          </h1>
        </div>
        <div className="h-[180px]">
          <img src={item.thumbnail} alt={item.productName} className="h-full w-full object-contain" />
        </div>
        <div className="flex items-center justify-between w-full mt-5">
          <p className="text-green-600 font-semibold">₹{item.price}</p>
          {cart.some((p) => p._id === item._id) ? (
            <button
              className="group-hover:bg-gray-700 group-hover:text-white transition duration-300 ease-in text-gray-700 border-2 border-gray-700 rounded-full font-semibold p-1 px-3 text-[12px] uppercase tracking-wide"
              onClick={removeFromTheCart}>
              Remove item
            </button>
          ) : (
            <button
              className="group-hover:bg-gray-700 group-hover:text-white transition duration-300 ease-in text-gray-700 border-2 border-gray-700 rounded-full font-semibold p-1 px-3 text-[12px] uppercase tracking-wide"
              onClick={addToTheCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
