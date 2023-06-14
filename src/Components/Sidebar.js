import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faBriefcase,
  faComments,
  faBell,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const user = JSON.parse(localStorage.getItem("user"));
console.log("user", user);

function Sidebar() {
  return (
    <div className="flex flex-col w-72 bg-gray-100 shadow-lg h-full">
      <div className="flex items-center justify-center h-16 text-3xl font-bold text-indigo-500 bg-white">
        <FontAwesomeIcon icon={faChartBar} className="text-4xl mr-2" />
        <span>Dashboard</span>
      </div>
      <ul className="flex flex-col py-6 space-y-4">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center px-6 py-3 text-lg text-gray-600 hover:text-indigo-500 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faChartLine} className="text-lg mr-3" />
            <span>Statistics</span>
          </Link>
        </li>
        <li>
          <Link
            to="/allusers"
            className="flex items-center px-6 py-3 text-lg text-gray-600 hover:text-indigo-500 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faUsers} className="text-lg mr-3" />
            <span>All Users</span>
          </Link>
        </li>
        <li>
          <Link
            to="/alljobs"
            className="flex items-center px-6 py-3 text-lg text-gray-600 hover:text-indigo-500 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faBriefcase} className="text-lg mr-3" />
            <span>All Jobs</span>
          </Link>
        </li>
        <li>
          <Link
            to="/allcomments"
            className="flex items-center px-6 py-3 text-lg text-gray-600 hover:text-indigo-500 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faComments} className="text-lg mr-3" />
            <span>Comments</span>
          </Link>
        </li>
        <li>
          <Link
            to="/allrequests"
            className="flex items-center px-6 py-3 text-lg text-gray-600 hover:text-indigo-500 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faBell} className="text-lg mr-3" />
            <span>Requests</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
