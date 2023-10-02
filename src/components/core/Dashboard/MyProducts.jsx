import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchSellerProducts} from "../../../services/operations/ProductDetailsAPI"
import IconBtn from "../../common/IconBtn"
import ProductsTable from "./SellerProducts/ProductsTable"

export default function MyProducts() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetchSellerProducts(token)
      if (result) {
        setProducts(result)
      }
    }
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Products</h1>
        <IconBtn
          text="Add Product"
          onclick={() => navigate("/dashboard/add-product")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {products && <ProductsTable products={products} setProducts={setProducts} />}
    </div>
  )
}
