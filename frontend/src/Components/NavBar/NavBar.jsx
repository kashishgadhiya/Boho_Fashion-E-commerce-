

import {useNavigate} from "react-router-dom"
import React, { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./NavBar.css";
// import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { FaBarsStaggered } from "react-icons/fa6";

import { ShopContext } from "../../Context/ShopContext";
import Topnav from "./Topnav";

const NavBar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [menu, setMenu] = useState("Home");
  const { getTotalCartItems } = useContext(ShopContext);
  const [query, setQuery] = useState('');

  const scrollToAboutus = () => {
    const aboutUsSection = document.getElementById('aboutus');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };
  const navigate = useNavigate();

  const handleClick = () => {
      navigate('/profile');
    };

  return (
    <>
      {/* Mobile navbar */}
      <Topnav />
      <div
        className="items-center w-full lg:py-8 py-1 lg:hidden bg-white z-50"
        style={{ color: "#a00220" }}
      >
        <div className="flex justify-between">
          <div className="flex">
            <img src={logo} alt="logo" width={170} className="lg:hidden" />
          </div>

          <div className="flex justify-end mx-3 gap-5 py-3">
            <Link to="/cart" className="">
              <FaShoppingCart className="text-2xl" />
              <div className="count">{getTotalCartItems()}</div>
            </Link>
          </div>
        </div>

        {/* For mobile */}
        <button
          className="border p-2 my-1 mx-3 lg:hidden"
          onClick={() => setMobileNav((prev) => !prev)}
        >
          <FaBarsStaggered />
        </button>

        {mobileNav && (
          <div
            className="p-4 rounded-lg mt-2 gap-3 font-semibold text-center Navhr bg-transparent border backdrop-blur-xl"
            onClick={() => setMobileNav(false)}
          >
            <ul className="flex flex-col gap-6 text-lg">
              <li onClick={() => setMenu("Home")}>
                <Link to="/" className="hover:bg-orange-100"> Home</Link>
              </li>

              <li onClick={() => setMenu("Women")}>
                <Link to="/Women"> Women</Link>
              </li>
              <li onClick={() => setMenu("Men")}>
                <Link to="/men"> Men </Link>
              </li>
              <li onClick={() => setMenu("About Us")}>
                <Link onClick={scrollToAboutus}> About Us </Link>
               
              </li>
            </ul>

            {/* <CgProfile /> */}
            {localStorage.getItem("auth-token") ? (
              <button
                onClick={handleLogout}
                className="border-1 rounded-full py-1 px-5 text-lg active:bg-transparent hover:px-6 mt-2 bg-[#a00200] text-white"
                style={{ border: "1px solid white" }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="border-1 rounded-full py-1 px-5 text-lg active:bg-transparent hover:px-6 mt-2 bg-[#a00200] text-white"
                  style={{ border: "1px solid white" }}
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* NavBar */}
      <div className="lg:flex lg:py-8 justify-between py-5 hidden md:hidden items-center z-50" style={{ color: "#a00220" }}>
        <div className="hidden lg:block">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              width={250}
              className="transition ease-in-out delay-150 hover:scale-105 duration-300 cursor-pointer"
            />
          </Link>
        </div>
        <div className="Navhr cursor-pointer hidden lg:inline">
          <ul className="flex gap-6 text-lg">
            <li onClick={() => setMenu("Home")}>
              <Link to="/"> Home</Link>
              {menu === "Home" ? <hr /> : <></>}
            </li>

            <li onClick={() => setMenu("Women")}>
              <Link to="/Women"> Women</Link>
              {menu === "Women" ? <hr /> : <></>}
            </li>
            <li onClick={() => setMenu("Men")}>
              <Link to="/men"> Men </Link>
              {menu === "Men" ? <hr /> : <></>}
            </li>
            <li onClick={() => setMenu("your own")}>
              <Link to="/make"> Create Your Design </Link>
              {menu === "your own" ? <hr /> : <></>}
            </li>
            <li onClick={() => setMenu("About Us")}>
              <Link onClick={scrollToAboutus}> About Us </Link>
              {menu === "About Us" ? <hr /> : <></>}
            </li>
          </ul>
        </div>

        {/* Login */}
        <div className="flex justify-center items-center gap-4 px-5">
          <div onClick={handleClick} className="cursor-pointer">
        {/* <CgProfile className="text-2xl" />  */}

          </div>
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={handleLogout}
              className="border-1 rounded-full py-1 px-5 text-lg active:bg-transparent hover:px-6 hidden lg:inline mt-3 bg-[#a00200] text-white"
              style={{ border: "1px solid white" }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                className="border-1 rounded-full py-1 px-5 text-lg active:bg-transparent hidden lg:inline mt-3 transition ease-in-out delay-150 hover:scale-105 duration-300 cursor-pointer"
                style={{ border: "1px solid white" }}
              >
                Login
              </button>
            </Link>
          )}
          <div className="flex justify-center items-center">
            <Link to="/cart" className="">
              <FaShoppingCart className="text-2xl" />
              <div className="count">{getTotalCartItems()}</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
