import React from "react";
import Stats from "../Components/Stats";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [commentData, setCommentData] = useState([]);

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
  const [totalJobs, setTotalJobs] = useState(0);
  useEffect(() => {
    fetch("/dashboard")
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setTotalJobs(parseInt(data));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("/comments")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCommentData(data);
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
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err.message));
  }, []);
  const jobDeleting = async (id) => {
    try {
      const response = await axios.delete(`/jobs/${id}`);

      console.log("deletedJob", response);

      setJobs((jobs) => jobs.filter((job) => job._id !== response._id));

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="box-border overflow-x-hidden">
      <div class="flex flex-row h-screen w-screen bg-gray-100 m-0">
        <Sidebar />
        <div class=" w-full">
          <Stats />
          <div className="flex flex-col">
            <h1 className="text-center text-2xl font-bold">Users</h1>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <table class="w-3/4 divide-y divide-gray-200 mx-auto">
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
                        User Profile Pic
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
                        <td className="px-6 py-4 whitespace-nowrap" >
                          <div className="text-sm text-gray-900">
                        <img src={`data:image/jpeg;base64,${user.userProfilePicture}`}  className="w-8 h-8 rounded-full"
alt="My Image" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.username}
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
                            class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded mr-2"
                            onClick={() => handleDelete(user.userid)}
                          >
                            Delete
                          </button>

                          <button class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                            <Link
                              to={`/edituser/${user.userid}`}
                              class="text-white"
                            >
                              Edit
                            </Link>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h1 className="text-center text-2xl font-bold mt-12">Jobs</h1>
                {/* <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"> */}
                <table class="w-3/4 divide-y divide-gray-200 mx-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job City
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
                    {jobs.map((job) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {job.jobId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {job.jobTitle}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {job.jobDescription}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {job.jobType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {job.jobCategory}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {job.jobCity}
                          </div>
                        </td>
                       

                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div class="flex justify-center">
                            <button
                              class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded mr-2"
                              onClick={() => jobDeleting(job.jobId)}
                            >
                              Delete
                            </button>
                            <button class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                              <Link
                                to={`/editjobs/${job.jobId}`}
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
                {/* </div> */}
                <h1 className="text-center text-2xl font-bold mt-12">
                  Comments
                </h1>
                {/* <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"> */}
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
                          <div className="text-sm text-gray-900">
                            {comment.commentId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {comment.userid}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {comment.jobid}
                          </div>
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
                              onClick={() =>
                                handleDeleteComment(comment.commentid)
                              }
                            >
                              Delete
                            </button>
                            <button class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                              <Link
                                to={`/editComment/${comment.commentid}`}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
