import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
// console.log("user", user);
function MyJobs() {
  const id = useParams();
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  // console.log(id);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userResponse = await axios.get("/user/profile");
        const userData = userResponse.data.user[0];
        setUser(userData);

        const jobsResponse = await axios.get(`/myjobs/${id}`);
        const jobsData = jobsResponse.data.jobs;
        setJobs(jobsData);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchJobs();
  }, [id]);

  const handleDeleteMyJob = async (jobId) => {
    try {
      const response = await axios.delete(`/jobs/${jobId}`);
      if (response.status === 200) {
        setJobs(jobs.filter((job) => job.jobId !== jobId));
      } else {
        // console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred during job deletion:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <table className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Job Title</th>
            <th className="py-2 px-4">Job Type</th>
            <th className="py-2 px-4">Job Category</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{job.jobTitle}</td>
              <td className="py-2 px-4">{job.jobType}</td>
              <td className="py-2 px-4">{job.jobCategory}</td>
              <td className="py-2 px-4">{job.jobDescription}</td>
              <td className="py-2 px-4">{job.jobPrice}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDeleteMyJob(job.jobId)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
                <button class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                  <Link to={`/editMyJobs/${job.jobId}`} class="text-white">
                    Edit
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyJobs;
