import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={"top-3 right-7 my-auto bg-white p-2 fixed rounded-lg"}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes size={20} color="black" />
        ) : (
          <>
            <div className="w-5 h-1 bg-zinc-800 my-0.5"></div>
            <div className="w-5 h-1 bg-zinc-800 my-0.5"></div>
            <div className="w-5 h-1 bg-zinc-800 my-0.5"></div>
          </>
        )}
      </button>
      {isMenuOpen && (
        <section className="bg-zinc-700 p-2 fixed right-7 top-[4rem]">
          <ul className="list-none">
            <li>
              <NavLink
                className="list-item py-2 px-3 my-1 block hover:bg-gray-600 rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#10b981" : "white", //emerald-500
                  backgroundColor: isActive && "#022c22", //emerald-950
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 my-1 block hover:bg-gray-600 rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#10b981" : "white", //emerald-500
                  backgroundColor: isActive && "#022c22", //emerald-950
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 my-1 block hover:bg-gray-600 rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#10b981" : "white", //emerald-500
                  backgroundColor: isActive && "#022c22", //emerald-950
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 my-1 block hover:bg-gray-600 rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#10b981" : "white", //emerald-500
                  backgroundColor: isActive && "#022c22", //emerald-950
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 my-1 block hover:bg-gray-600 rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#10b981" : "white", //emerald-500
                  backgroundColor: isActive && "#022c22", //emerald-950
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 my-1 block hover:bg-gray-600 rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#10b981" : "white", //emerald-500
                  backgroundColor: isActive && "#022c22", //emerald-950
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
