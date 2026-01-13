import React, { useState, useEffect, useRef } from "react";
import { HeaderNavigation } from "../Navigation/HeaderNavigations";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  FaSearch,
  FaRegUser,
  FaUser,
  FaRegStar,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoLogOutOutline, IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import AuthModal from "../components/AuthModal/AuthModal";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Auth/action";

function Header() {
  const [show, setShow] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const { setIsCartOpen } = useCart();
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.auth);
  const { cartItems } = useSelector((store) => store.cart);
  const isLoggedIn = !!token;
  const wishlistCount = user?.wishlist?.length || 0;

  useEffect(() => {
    // Close menu when clicking outside
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY.current) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      setShowProfileMenu(!showProfileMenu);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
    navigate("/");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full bg-black text-white text-center py-2">
          <span className="hover:text-gray-400 cursor-pointer">
            up to 80 % off
          </span>
        </div>

        <div className="flex justify-between items-center w-[1390px] mx-auto py-3">
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            UPTOWNIE
          </div>

          {/* Center Search Bar */}
          {isSearchOpen && (
            <div className="flex-1 mx-12 animate-fade-in">
              <div className="relative w-full max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for products..."
                  autoFocus
                  className="w-full text-center border border-gray-400 rounded-full py-2 px-6 focus:outline-none focus:border-black text-gray-800 placeholder-gray-500 bg-transparent text-lg transition-colors"
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 items-center">
            {isSearchOpen ? (
              <FaTimes
                className="text-[20px] cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => setIsSearchOpen(false)}
              />
            ) : (
              <FaSearch
                className="text-[20px] cursor-pointer hover:text-gray-600 transition-colors"
                onClick={() => setIsSearchOpen(true)}
              />
            )}

            <div className="relative" ref={menuRef}>
              {isLoggedIn ? (
                <FaUser
                  className="text-[20px] cursor-pointer hover:text-gray-600 transition-colors"
                  onClick={handleAccountClick}
                />
              ) : (
                <FaRegUser
                  className="text-[20px] cursor-pointer hover:text-gray-600 transition-colors"
                  onClick={handleAccountClick}
                />
              )}

              {/* Profile Dropdown Menu */}
              {isLoggedIn && showProfileMenu && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                  <div
                    className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      setIsLoadingOrders(true);
                      setTimeout(() => {
                        setIsLoadingOrders(false);
                        navigate("/orders");
                        setShowProfileMenu(false);
                      }, 800);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <IoBagHandleOutline size={20} />
                      <span className="font-medium text-sm">Order History</span>
                    </div>
                    {isLoadingOrders && (
                      <FaSpinner className="animate-spin text-gray-500" />
                    )}
                  </div>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <div className="px-4 py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all text-sm font-medium"
                    >
                      <span>Logout</span>
                      <IoLogOutOutline size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative group cursor-pointer hover:text-gray-600 transition-colors"
              onClick={() => navigate("/wishlist")}
            >
              <FaRegStar className="text-[20px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </div>
            <div
              className="relative group cursor-pointer hover:text-gray-600 transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <MdOutlineShoppingBag className="text-[20px]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#252525]">
          <div className="text-white  flex gap-7 max-w-[1150px] mx-auto">
            {HeaderNavigation.map((data) => (
              <div key={data.id} className="relative group">
                {/* Title */}
                <h1 className="cursor-pointer py-2 group">
                  {/* Row */}
                  <div className="flex justify-between items-center">
                    <span>{data.title}</span>

                    <span className="text-[22px] transition-transform duration-300 group-hover:rotate-180">
                      <RiArrowDropDownLine />
                    </span>
                  </div>

                  {/* Underline */}
                  <div className="h-[2px] w-0 bg-[#F4F4F4] mt-px  ml-3 mr-3 transition-all duration-300 group-hover:w-[70%]"></div>
                </h1>

                {/* Subheading */}
                {data.subHeading && (
                  <div className="absolute left-0 top-[36px]  mt-2 hidden group-hover:block bg-white text-black w-56 shadow-lg z-50">
                    {data.subHeading.map((sub) => (
                      <p
                        key={sub.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate(sub.link)}
                      >
                        {sub.title}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          checkLoginStatus(); // Re-check login status when modal closes
        }}
      />
    </>
  );
}

export default Header;
