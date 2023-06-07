import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {});
      console.log("Logged out successfully");
      localStorage.setItem("user", "{}");
      setUser({}); // Clear the user data
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const userResponse = await axios.get("/user/profile");
      const userData = userResponse.data.user[0];
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [isProfileUpdated]); // Listen for changes in isProfileUpdated only

  const userIsLogged = Object.keys(user).length > 0;
  const userIsLoggedAsAdmin =
    Object.keys(user).length > 0 && user.usertype === "admin";

  return (
    <div>
      <nav className="backdrop-blur-sm bg-gray-400 bg-opacity-40 text-white px-6 py-4 flex justify-between items-center relative w-full top-0 z-50">
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
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
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
          {!userIsLogged && (
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
          )}
        </div>
        {userIsLogged && (
          <div className="relative z-50">
            <button
              id="dropdownAvatarNameButton"
              className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white overflow-visible"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                src={`data:image/jpeg;base64,${user.userProfilePicture}`}
                className="w-10 h-10 rounded-full"
                alt="My Image"
              />
              {user.username}
              <svg
                className="w-4 h-4 mx-1.5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div
                id="dropdownAvatarName"
                className="overflow-hidden absolute top-10 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 z-50"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-medium capitalize">{user.usertype}</div>
                  <div className="truncate">{user.email}</div>
                </div>

                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownInformdropdownAvatarNameationButton"
                >
                  {userIsLoggedAsAdmin && (
                    <Link to="/dashboard">
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Dashboard
                        </a>
                      </li>
                    </Link>
                  )}
                  <Link to="/user/profile">
                    <li>
                      <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        My Profile
                      </a>
                    </li>
                  </Link>
                  <Link to={`/myjobs/${user.userid}`}>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        My Jobs
                      </a>
                    </li>
                  </Link>
                </ul>
                <div className="py-2">
                  <p
                    onClick={handleLogout}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
