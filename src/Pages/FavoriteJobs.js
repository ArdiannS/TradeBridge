import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteJobs = () => {

const [jobs, setJobs] = useState([]);
useEffect(() => {
  fetch("/jobs")
    .then((res) => res.json())
    .then((data) => {
      const jobsWithFavorites = data.map((job) => ({
        ...job,
        favoriteJobs: false,
      }));
      console.log('this is data in jobs', data)
      setJobs(jobsWithFavorites);
      setJobs(data);
      // console.log(data);
    })
    .catch((err) => console.error(err.message));
}, []);
  const [favoriteJobs, setFavoriteJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/favoriteJobss");
        const data = response.data;
        setFavoriteJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteJobs");
    if (storedFavorites) {
      setFavoriteJobs(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteJobs", JSON.stringify(favoriteJobs));
  }, [favoriteJobs]);

  const handleAddToFavorites = async (jobId) => {
    // Check if the job is already in favorites

    const isAlreadyFavorite = jobs.some((job) => job.jobId === jobId && job.favoriteJobs === 1);

    const jobToAdd = jobs.find((job) => job.jobId === jobId);
   
    

    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('favoriteJobs', !jobToAdd.favoriteJobs);
    console.log('this is form data', formData)
  let body = {
  'jobId': jobId,
  'favoriteJobs': !jobToAdd.favoriteJobs
}
    await axios.put("/editFavoriteJob", {
      body,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

 

    if (isAlreadyFavorite) {
      const updatedFavorites = favoriteJobs.filter((job) => job.jobId !== jobId);
      setFavoriteJobs(updatedFavorites);
  
    } else {
      // Add the job to favorites if it's not already favorited
      const jobToAdd = jobs.find((job) => job.jobId === jobId);
      if (jobToAdd) {
        setFavoriteJobs([...favoriteJobs, jobToAdd]);
      }
    }
  };


  const convertToImageUrl = (base64String) => {
    return `data:image/png;base64,${base64String}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Favorite Jobs</h1>
        {favoriteJobs.map((job) => (
          <div
            key={job.jobId}
            className="flex items-center bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <div className="w-1/2 pr-8">
              <h2 className="text-2xl font-bold mb-4">{job.jobTitle}</h2>
              <p className="text-gray-600 mb-2">
                Type: {job.jobType}
              </p>
              <p className="text-gray-600 mb-2">
                Category: {job.jobCategory}
              </p>
              <p className="text-gray-600 mb-4">
                City: {job.jobCity}
              </p>
              <p className="text-gray-600 mb-4">{job.jobDescription}</p>
              <button
                className="bg-white text-indigo-500 font-bold py-3 px-6 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
                onClick={() => handleAddToFavorites(job.jobId)}
              >
                {job.favoriteJobs ? (
                  <FaHeart size={26} />
                ) : (
                  <FaRegHeart size={26} />
                )}
              </button>
            </div>
            <div className="w-1/2">
              <img
                src={convertToImageUrl(job.jobPhoto)}
                alt="Job Photo"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default FavoriteJobs;
