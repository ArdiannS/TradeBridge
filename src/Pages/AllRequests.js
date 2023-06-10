import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

function AllRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("/request")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err.message));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/request/${id}`);
      setRequests((requests) =>
        requests.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-blue-600 shadow-lg rounded-lg p-6">
        <table className="w-full text-white">
          <thead className="bg-blue-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Request
              </th>
              <th className="text-sm font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-blue-600 divide-y divide-blue-700">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.request}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(request.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllRequests;
