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

  // const handleEdit = async (id) => {
  //   try {
  //     const response = await fetch(`/users/${id}`, {
  //       method: "PUT",
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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

      // const deletedJob = await response.json();
      console.log("deletedJob", response);

      setJobs((jobs) => jobs.filter((job) => job._id !== response._id));

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="box-border overflow-x-hidden h-screen bg-gray-100">
      <div class="flex h-full">
        <div class="w-1/4  bg-gray-100 flex-shrink-0 h-full">
          <Sidebar />
        </div>
        <div class="w-3/4 flex flex-col items-center justify-center">
          <div class="mt-8 w-3/4">
            <div class="text-center">
              <Stats />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
