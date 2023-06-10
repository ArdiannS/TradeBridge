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
      <div className="flex justify-between">
        <div className="bg-black max-w-[330px]">
          <Sidebar/>
        </div>
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
          <div className="bg-blue-600 shadow-lg rounded-lg p-6">
            <table className="w-full">
              <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Comment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Job ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Comment Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody className="bg-blue-600 text-white divide-y divide-blue-700">
              {commentData.map((comment) => (
                  <tr key={comment.commentId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {comment.commentid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {comment.userid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {comment.jobid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {comment.commentContent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-center">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded mr-2"
                            onClick={() => handleDeleteComment(comment.commentid)}
                        >
                          Delete
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                          <Link to={`/editComment/${comment.commentid}`} className="text-white">
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
        </div>
      </div>

  );
}

export default AllCommentsPage;
