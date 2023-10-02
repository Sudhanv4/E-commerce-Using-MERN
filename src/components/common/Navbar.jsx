import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineMenu,AiOutlineShoppingCart } from "react-icons/ai"
import {ImCross} from "react-icons/im"
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { AiOutlineDown } from "react-icons/ai"
import { ACCOUNT_TYPE } from "../../utils/constants";
import logo from "../../assets/company.png"
import SmallScreenNavbar from "./SmallScreenNavbar";


const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
  let [isClose, setIsClose] = useState(false);

    const location = useLocation()

    const { subLinks, setSubLinks } = useState([])

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result", result.data.data)
            setSubLinks(result.data.data);
        }
        catch (error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect(() => {
        fetchSublinks();
        console.log(user)


    }, [])

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    const handleCrossButton = () => { 
        isClose = isClose ? setIsClose(false) : setIsClose(true);  
        // smallScreen = smallScreen ? setSmallScreen(false) : setSmallScreen(true);
      }
    return (
        <div className="flex h-14 items-center justify-center border-b-[2px] bg-slate-500 border-b-[#FD5F07]">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                <Link to="/" className="flex items-center gap-1 justify-between">
                    <img src={logo} height={40} width={40}></img>
                    <h1 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-slate-200 to-slate-300">Pi-Trade</h1>
                </Link>
                <nav>
                    <div className="hidden md:block">

                   
                    <ul className="flex gap-x-6 text-slate-900">
                        {
                            NavbarLinks.map((link, index) => (

                                <li key={index}>

                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? 'border-2 rounded-md p-2 border-[#c9d0d8] bg-slate-300 text-[#FD5F07] text-xl text font-bold' : 'border-2 rounded-md p-2 border-[#c9d0d8] text-white text-xl hover:bg-slate-400'}`}>
                                            {link.title}
                                        </p>
                                    </Link>


                                </li>
                            ))
                        }
                    </ul>
                    </div>
                </nav>

                <div className="hidden md:flex gap-x-4 items-center">
                    {
                        user && user.accountType !== ACCOUNT_TYPE.SELLER && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart className="text-2xl text-slate-100" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-[#f9c3a6] text-center text-xs font-bold text-slate-900">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )
                    }
                    {token == null && (
                        <Link to="/login">
                            <button className="border hover:bg-slate-900 border-slate-500 bg-black px-[12px] py-[8px]
                            text-white rounded-md">
                                Log in
                            </button>
                        </Link>
                    )}
                    {
                        token == null && (
                            <Link to="/signup">
                                <button className="border border-slate-500 hover:bg-slate-900 bg-black px-[12px] py-[8px]
                            text-white rounded-md">
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown />
                    }

                </div>
                {
                    isClose === false ? (
                        <button className="mr-4 md:hidden"
                            onClick={handleCrossButton}>
                            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                        </button>
                    ) :
                        (
                            <button className="mr-4 md:hidden"
                                onClick={handleCrossButton}>
                                <ImCross fontSize={24} fill="#AFB2BF" />
                            </button>
                        )
                }
                {
                    isClose && (
                        <SmallScreenNavbar
                            isClose={isClose}
                            // setIsClose={setIsClose}
                            handleCrossButton={handleCrossButton} />
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;