import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="bg-gray-900 bg-opacity-80 text-white px-6 py-4 flex justify-between items-center fixed w-full z-50">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold tracking-wider">
            <img
              src={require("./logoo2.png")}
              className="h-5 md:h-20"
              alt="Logo"
            ></img>
          </h1>
        </div>
        <div className="flex items-center space-x-6 md:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-white focus:outline-none focus:text-white"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex items-center space-x-6 text-sm font-medium">
            <li>
              <a href="#" className="hover:text-gray-200" alt="">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200" alt="">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200" alt="">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200" alt="">
                Contact Us
              </a>
            </li>
          </ul>
          <div className="flex items-center space-x-6">
            <button className="bg-white text-gray-900 py-2 px-6 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ease-in-out">
              Sign Up
            </button>
            <button className="text-white bg-transparent border border-white py-2 px-6 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300 ease-in-out">
              Sign In
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
