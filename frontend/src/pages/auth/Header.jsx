import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { setProductSearch } from "../../redux/features/shop/shopSlice";
import AdminMenu from "../admin/AdminMenu";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(setProductSearch(search.trim().toLowerCase()));
    navigate("/shop");
  };

  return (
    <div
      style={{ zIndex: 990 }}
      className="flex flex-row justify-between items-center
      p-1 bg-zinc-800 h-[10%] w-[100vw] fixed"
    >
      <div></div>
      <form onSubmit={handleSearch}>
        <AiOutlineSearch
          size={24}
          className="absolute top-4 right-[30.5rem] text-gray-500 cursor-pointer z-1"
        />
        <input
          className="border-none rounded-full px-4 py-2 w-[30vw] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Search..."
          value={search}
          onChange={handleInputChange}
        />
      </form>
      <div>{userInfo && userInfo.isAdmin && <AdminMenu />}</div>
    </div>
  );
};

export default Header;
