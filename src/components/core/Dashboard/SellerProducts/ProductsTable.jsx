import {  useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"

import { RiDeleteBin6Line } from "react-icons/ri"
import {
  deleteProduct,
  fetchSellerProducts,
} from "../../../../services/operations/ProductDetailsAPI"

export default function ProductsTable({ products, setProducts }) {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const TRUNCATE_LENGTH = 30

  const handleProductDelete = async (productId) => {
    setLoading(true)
    await deleteProduct({ productId: productId }, token)
    const result = await fetchSellerProducts(token)
    if (result) {
      setProducts(result)
    }
    setLoading(false)
  }

  // console.log("All product ", products)

  return (
    <>
      <Table className="rounded-xl border-2 bg-slate-100 border-slate-300 ">
        <Thead>
          <Tr className="flex gap-x-10  border-b  bg-slate-300 border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              products
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Delete
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No products found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            products?.map((product) => (
              <Tr
                key={product._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={product?.thumbnail}
                    alt={product?.productName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {product.productName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {product.productDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? product.productDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : product.productDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created:
                    </p>
                    
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{product.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 ">
                  
                  <button
                    disabled={loading}
                    onClick={() => handleProductDelete(product._id)}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  )
}
