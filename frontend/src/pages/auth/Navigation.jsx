import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";
import FavoritesCount from "../products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onMouseLeave={dropdownOpen ? toggleDropdown : undefined}
      onClick={dropdownOpen ? toggleDropdown : undefined}
      style={{ zIndex: 980 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between 
      p-4 pt-10 text-white bg-zinc-800 w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform
            transform hover:translate-x-2"
        >
          <AiOutlineHome className="mt-[2rem]" size={24} />
          <span className="hidden nav-item-name ml-2  mt-[2rem]">HOME</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform
            transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mt-[2rem]" size={24} />
          <span className="hidden nav-item-name ml-2  mt-[2rem]">SHOP</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform
            transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mt-[2rem]" size={24} />
          <span className="hidden nav-item-name ml-2  mt-[2rem]">CART</span>
          <div className="absolute left-4 top-10">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-emerald-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform
            transform hover:translate-x-2"
        >
          <AiOutlineHeart className="mt-[2rem]" size={24} />
          <span className="hidden nav-item-name ml-2  mt-[2rem]">FAVORITE</span>
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          {userInfo ? (
            <>
              <AiOutlineUser className="mr-[1rem]" size={24} />
              <span className="text-white">{userInfo.username}</span>
            </>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-zinc-700 text-white ${
              !userInfo.isAdmin ? "-top-[6.5rem]" : "-top-[22rem]"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-600">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-600"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform
            transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mt-[3rem]" size={24} />
              <span className="hidden nav-item-name ml-2  mt-[3rem]">
                Login
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform
            transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mt-[3rem]" size={24} />
              <span className="hidden nav-item-name ml-2  mt-[3rem]">
                Register
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
