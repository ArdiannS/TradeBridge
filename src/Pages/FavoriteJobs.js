import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useParams } from "react-router-dom";

const FavoriteJobs = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);

  useEffect(() => {
    fetch("/favoriteJobs") // Fetching favorite jobs instead of all jobs
      .then((res) => res.json())
      .then((data) => {
        setFavoriteJobs(data);
        // console.log(data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <h1>Favorite Jobs</h1>
      {favoriteJobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoriteJobs;
