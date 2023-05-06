import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [editingUser, setEditingUsername] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: "PUT",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex">
      <div class="flex flex-row h-screen bg-gray-100 float-left">
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
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                <i class="bx bx-music mr-3"></i>
                <span>Music</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                <i class="bx bx-drink mr-3"></i>
                <span>Drink</span>
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
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Password
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Birthday
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.map((user) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.userid}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.passwordi}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.birthday}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.usertype}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-red-600 hover:text-red-900 mr-2"
                          onClick={() => handleDelete(user.userid)}
                        >
                          Delete
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
