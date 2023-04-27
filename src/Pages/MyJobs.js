import Stats from "../Components/Stats";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <Dashboard />
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Job Type</th>
            <th>Job Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.jobTitle}</td>
              <td>{job.jobType}</td>
              <td>{job.jobCategory}</td>
              <td>{job.jobDescription}</td>
              <td>{job.jobPrice}</td>
              <td>{job.jobCity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyJobs;
