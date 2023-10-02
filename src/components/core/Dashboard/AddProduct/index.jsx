import ProductInformationForm from "./ProductInformationForm";

export default function AddProduct() {
  return (
    <>
      <div className="flex w-[50%] items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Product
          </h1>
          
        </div>
      </div>
      <ProductInformationForm/>
    </>
  )
}
