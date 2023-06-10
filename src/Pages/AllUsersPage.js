import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import Sidebar from "../Components/Sidebar";
function AllUsersPage() {
  const [userData, setUserData] = useState([]);
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
      axios
        .delete(`/users/${id}`)
        .then((res) => {
          setUserData(userData.filter((x) => x.userid != id));
        })
        .catch((err) => {
          console.log("err", err.message);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <div className="flex justify-between">
    <div className="bg-black max-w-[330px]">
      <Sidebar/>
    </div>
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <div className="bg-blue-600 shadow-lg rounded-lg p-6">
        <table className="w-full">
          <thead className="bg-blue-700 text-white ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium   uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                User Profile Pic
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Birthday
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                User Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-600 text-white divide-y divide-blue-700">
            {userData.map((user) => (
              <tr key={user.userid}>
                <td className="px-6 py-4 whitespace-nowrap">{user.userid}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <img
                        src={`data:image/jpeg;base64, ${user.userProfilePicture}`}
                        className="w-8 h-8 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.birthday}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.usertype}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded mr-2 "
                    onClick={() => handleDelete(user.userid)}
                  >
                    Delete
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                    <Link
                      to={`/edituser/${user.userid}`}
                      className="text-white"
                    >
                      Edit
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </div>
  );
}

export default AllUsersPage;
