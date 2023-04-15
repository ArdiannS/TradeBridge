import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="backdrop-blur-sm bg-gray-400 bg-opacity-40 text-white px-6 py-4 flex justify-between items-center  w-full top-0 z-50">
        
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold tracking-wider">
            <Link to="/">
              <img
                src={require("../images/logoo2.png")}
                className="h-5 md:h-20"
                alt="Logo"
              ></img>
            </Link>
          </h1>
        </div>
        <form className="w-1/3">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
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
          <div className="flex items-center space-x-6">
            <Link to="/signup">
              <button className="bg-white text-gray-900 py-2 px-6 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ease-in-out">
                Sign Up
              </button>
            </Link>
            <Link to="/signin">
              <button className="text-white bg-transparent border border-white py-2 px-6 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300 ease-in-out">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
