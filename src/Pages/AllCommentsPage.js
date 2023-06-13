import React from "react";
import Stats from "../Components/Stats";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
function AllCommentsPage() {
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    fetch("/comments")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCommentData(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleDeleteComment = async (id) => {
    try {
      axios
        .delete(`/comments/${id}`)
        .then((res) => {
          setCommentData(commentData.filter((x) => x.commentId != id));
        })
        .catch((err) => {
          console.log("err", err.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <table class="w-3/4 divide-y divide-gray-200 mx-auto">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Comment ID
            </th>
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
              Job Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Comment Content
            </th>

            <th
              scope="col"
              className=" text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {commentData.map((comment) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{comment.commentId}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{comment.userid}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{comment.jobid}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {comment.commentContent}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-center">
                  <button
                    class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleDeleteComment(comment.commentId)}
                  >
                    Delete
                  </button>
                  <button class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                    <Link
                      to={`/editComment/${comment.commentId}`}
                      class="text-white"
                    >
                      Edit
                    </Link>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCommentsPage;
