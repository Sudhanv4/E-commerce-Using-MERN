import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import * as Icons from "react-icons/vsc"
import {logout} from "../../services/operations/authAPI"
import { VscSignOut } from "react-icons/vsc"

// import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { sidebarLinks } from "../../data/dashboard-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

// import {ImCross} from "react-icons/im"
export default function SmallScreenNavbar({handleCrossButton, isClose}) {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  // const windowWidth = useRef(window.innerWidth);
  // console.log("--------window-width----", windowWidth);
  // const [smallScreen, setSmallScreen] = useState(false);
  // const [isClose, setIsClose] = useState(false);


  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  // const handleCrossButton = () => { 
  //   isClose = isClose ? setIsClose(false) : setIsClose(true);  
  //   // smallScreen = smallScreen ? setSmallScreen(false) : setSmallScreen(true);
  // }
  // const Icon = Icons[iconName]

  return (
    <div
    className={`moving-div-left lg:hidden
      flex flex-col absolute right-0 top-[57px] h-screen bg-[#2D353E]  justify-center border-l-[1px] z-[1000]
      border-l-richblack-700 w-[40%] ${
      location.pathname !== "/" ? "bg-[#2D353E] " : "bg-richblack-900"
    } transition-all duration-200`}
  >
    {/* ${isClose ? "moving-div-left" : "moving-div-right"} */}
    <div className= {`flex flex-col ${
      location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
      }  relative  w-[100%] h-[95%] 
         items-center gap-5`}>

      {/* Login / Signup / Dashboard */}
      <div className="items-center gap-y-2 flex flex-col">
        <div className="flex gap-4">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-slate-100" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden 
                rounded-full bg-slate-200 text-center text-xs font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        
        {token === null && (
          <Link to="/login">
            <button className="rounded-[8px] border-[1.5px] border-slate-300 bg-black px-[6px] py-[4px]
                z-[1000] text-white"
                onClick={handleCrossButton}>
              Log in
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup">
            <button className="rounded-[8px] border-[1.5px] border-slate-300 bg-black
              z-[1000] px-[6px] py-[4px] text-white" 
              onClick={handleCrossButton}>
              Sign up
            </button>
          </Link>
        )}
        
      </div>

      {
        token === null && (
          <div className="w-[100%] h-[1px] bg-slate-700 -mb-10"></div>
        )
      }
      {
        token !== null && (
          <div className="w-[100%] h-[1px] bg-slate-700 "></div>
        )
      }


      

      {/* DASHBOARD LINKS */}
      <nav className="block">
        <ul className="flex flex-col gap-y-2 ml-2 text-slate-100">
          {sidebarLinks.map((link) => (
            /* const Icon = Icons[{link?.icon}]; */
            <li key={link?.id} onClick={handleCrossButton}>
              { link.name === "My Profile"  && token !== null ? (
                <Link to={link?.path}>
                  <div>
                  {/* //icon  */}
                    {/* {link.icon} */}
                     
                    <p>
                      {link?.name}
                    </p>
                  </div>
                  
                </Link>
                ) :
                (
                  token !== null && link?.type === user?.accountType && (
                  <Link to={link?.path}>
                    <div className= {`${link.name === "Enrolled Courses" ?
                      "-mt-6" :"" }`}>
                      {/* //icon  */}
                        {/* {link.icon} */}
                        {/* <Icon />  */}
                        <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                        >
                          {link?.name}
                        </p>
                    </div>
                  </Link>
                  )
                )
              }

                

            </li>
          ))}
        </ul>
          
      </nav>
      {token!==null && <div className={` ${token !== null && user?.accountType === ACCOUNT_TYPE.STUDENT ? "mt-3" : "-mt-3"  }
           w-[100%]  h-[1px] bg-richblack-700 `}></div>}
        


      {
        token !== null && (
          <div className="w-[100%] h-[1px] bg-richblack-700 "></div>
        )
      }
      

      {/* Navigation links */}
      <nav className="block">
        <ul className="flex flex-col gap-y-2  -ml-8 text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index} onClick={handleCrossButton}>
              
                <Link to={link?.path}>
                  <p
                    className={`${
                      matchRoute(link?.path)
                        ? "text-white"
                        : "text-slate-200"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              
            </li>
          ))}
        </ul>
      </nav>
      
    </div>

    </div>
      
  )
}

// export default SmallScreenNavbar