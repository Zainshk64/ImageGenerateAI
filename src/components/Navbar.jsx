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
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            Sign Up
          </Link>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            Start Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
