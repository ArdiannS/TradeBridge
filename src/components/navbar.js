import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const navigate = useNavigate();

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
  }, [isProfileUpdated]);

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

  const handleEditProfile = async () => {
    // Call your API endpoint to update the profile
    try {
      // Update the profile using the API
      await axios.put("/user/profile", {
        /* Updated profile data */
      });
      setIsProfileUpdated(true); // Set the profile update flag to trigger re-fetch
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  const userIsLogged = Object.keys(user).length > 0;

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
        {/* Rest of the code */}
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
                className="w-8 h-8 mr-2 rounded-full"
                src={require("../images/logoo2.png")}
                alt="user photo"
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
                  <Link to="/dashboard">
                    <li>
                      <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Dashboard
                      </a>
                    </li>
                  </Link>
                  <li>
                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
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
