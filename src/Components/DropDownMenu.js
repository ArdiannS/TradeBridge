import React, { useState } from "react";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      <button
        id="dropdownAvatarNameButton"
        className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 mr-2 rounded-full"
          src={require("../images/logoo2.png")}
          alt="user photo"
        />
        Bonnie Green
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
            <div className="font-medium ">Pro User</div>
            <div className="truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200 "
            aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
          >
            <Link to="/dashboard">
              <li className=""> Dashboard</li>
            </Link>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
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
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white  "
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default DropdownMenu;
