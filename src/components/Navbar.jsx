import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="px-4 md:px-14 lg:px-24  py-5 bg-gray-50">
      <div className="flex justify-between items-center">
        <div className="flex gap-10">
          <Link to="/">
          <img src={logo} alt="logo" width={120} />
          </Link>
          <div className="md:flex hidden" >
            <ul className="flex gap-4 font">
              <li>
                <Link to="/agent1" className="hover:text-blue-600 transition-colors duration-200">
                  Agent 1
                </Link>
              </li>
              <li>
                <Link to="/agent2" className="hover:text-blue-600 transition-colors duration-200">
                  Agent 2
                </Link>
              </li>
              <li>
                <Link to="/agent3" className="hover:text-blue-600 transition-colors duration-200">
                  Agent 3
                </Link>
              </li>
              <li>
                <Link to="/agent4" className="hover:text-blue-600 transition-colors duration-200">
                  Agent 4
                </Link>
              </li>
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
