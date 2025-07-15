import React from "react";
import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div className="px-4 md:px-14 lg:px-24  py-5 bg-gray-50">
      <div className="flex justify-between items-center">
        <div className="flex gap-10">
          <img src={logo} alt="logo" width={120} />
          <div className="md:flex hidden" >
            <ul className="flex gap-4 font ">
              <li>Agent 1</li>
              <li>Agent 2</li>
              <li>Agent 3</li>
              <li>Agent 4</li>
            </ul>
          </div>
        </div>
        <div>
          <button className="cursor-pointer">Login</button>
          <button className="bg-[#3377F2] cursor-pointer text-white p-2 rounded-md ml-5 " >Start Trial</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
