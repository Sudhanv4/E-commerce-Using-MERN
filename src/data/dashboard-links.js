import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  
  {
    id: 1,
    name: "My Products",
    path: "/dashboard/my-products",
    type:ACCOUNT_TYPE.SELLER,
    icon: "VscInbox",
  },
  {
    id: 2,
    name: "Add Product",
    path: "/dashboard/add-product",
    type: ACCOUNT_TYPE.SELLER,
    icon: "VscAdd",
  },
  {
    id: 3,
    name: "My Orders",
    path: "/dashboard/my-list",
    type: ACCOUNT_TYPE.CONSUMER,
    icon: "VscInbox",
  },
  {
    id: 4,
    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.CONSUMER,
    icon: "VscArchive",
  },
]
