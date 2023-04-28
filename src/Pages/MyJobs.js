import Stats from "../Components/Stats";
// import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";

function MyJobs() {
  const [userData, setUserData] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
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

  return (
    <div>
      {/* <Dashboard/> */}
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
