import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Footer from "../components/common/Footer";
import { getAllProducts } from "../services/operations/ProductDetailsAPI";


const Home = () => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const data = response;
        setProducts(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-4 max-w-6xl mx-auto p-2 ">
        {products.map((item) => {
          return <Product key={item._id} item={item} />;
        })}
      </div>
      <Footer/>
    </>
  );
};

export default Home;
