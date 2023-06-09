import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

function AllJobsPage() {
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-blue-600 shadow-lg rounded-lg p-6">
        <table className="w-full text-white">
          <thead className="bg-blue-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Job ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Job Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Job Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Job Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Job City
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Job Price
              </th>
              <th className="text-sm font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-blue-600 divide-y divide-blue-700">
            {jobs.map((job) => (
              <tr key={job.jobId}>
                <td className="px-6 py-4 whitespace-nowrap">{job.jobId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {job.jobDescription}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{job.jobType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {job.jobCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{job.jobCity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.jobPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded mr-2"
                      onClick={() => jobDeleting(job.jobId)}
                    >
                      Delete
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                      <Link
                        to={`/editjobs/${job.jobId}`}
                        className="text-white"
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
  );
}

export default AllJobsPage;
