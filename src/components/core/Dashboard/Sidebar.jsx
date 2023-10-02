import {  useSelector } from "react-redux"

import { sidebarLinks } from "../../../data/dashboard-links"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px]  ">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="hidden lg:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px]  bg-[#2D353E] py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12" />
        
      </div>
    </>
  )
}
