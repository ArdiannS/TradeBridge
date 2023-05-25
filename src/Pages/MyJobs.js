import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useParams } from "react-router-dom";

function MyJobs() {
  const id = useParams();
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch the user's information
        const userResponse = await axios.get("/user/profile");
        const userData = userResponse.data.user[0];
        setUser(userData);
        // Fetch the jobs associated with the user
        fetch(`/myjobs/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const jobs = data.jobs;
            setJobs(jobs);

            // Do something with the jobs data
            console.log(jobs);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error(error);
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
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Delete
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
