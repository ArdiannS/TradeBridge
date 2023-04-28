import React from "react";
import Stats from "../Components/Stats";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div class="flex flex-row  bg-gray-100 ">
      <div class="flex flex-col w-56 bg-white shadow-lg">
        <div class="flex items-center justify-center h-16 text-lg font-bold text-indigo-500 bg-white">
          <span>Dashboard</span>
        </div>
        <ul class="flex flex-col py-4">
          <li>
            <a
              href="#"
              class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <i class="bx bx-home mr-3"></i>
              <span>User Profile</span>
            </a>
          </li>
          <li>
            <Link
              to="/myjobs"
              href="#"
              class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <i class="bx bx-music mr-3"></i>
              <span>My jobs</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <i class="bx bx-drink mr-3"></i>
              <span>Comments</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <i class="bx bx-shopping-bag mr-3"></i>
              <span>Shopping</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <i class="bx bx-chat mr-3"></i>
              <span>Chat</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <i class="bx bx-user mr-3"></i>
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <i class="bx bx-bell mr-3"></i>
              <span>Notifications</span>
              <span class="ml-auto text-xs font-semibold text-red-500 bg-red-100 rounded-full px-3 py-1">
                5
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <i class="bx bx-log-out mr-3"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div class=" w-full ">
        <Stats />
      </div>
    </div>
  );
};
export default Dashboard;
