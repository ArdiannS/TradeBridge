import React, { useState, useEffect } from "react";
import { FaFacebook, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import First from "../images/bgImg.jpeg";
import Second from "../images/foto1.jpg";
import Third from "../images/login.jpg";
import Fourth from "../images/logoo2.png";
import "../CSS/Scrollbar.css";
import { MdOutlineInfo } from "react-icons/md";
import { BsSliders } from "react-icons/bs";
import Footer from "../Components/Footer";
import axios from "../api/axiosInstance";
import { FaSadCry } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
function JobSearch() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const isLoggedIn = user && Object.keys(user).length > 0
  console.log(isLoggedIn);
  const useri = user?.username;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await axios.get("/jobs", {
        params: {
          title: searchTerm,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#aaa",
    }),
  };

  const images = [First, Second, Third, Fourth];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [selectedJob, setSelectedJob] = useState(null);

  function handleJobClick(job) {
    const jobId = job.jobId;
    setSelectedJob(job);
  }
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        const jobsWithFavorites = data.map((job) => ({
          ...job,
          favoriteJobs: false,
        }));
        console.log("this is data in jobs", data);
        setJobs(jobsWithFavorites);
        setJobs(data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  useEffect(() => {
    fetch("/dashboard/total-jobs")
      .then((response) => response.text())
      .then((data) => {
        setTotalJobs(parseInt(data));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setIsFiltering(categoryValue !== "all");
    setIsDropdownOpen(false);
    filterJobsByCategory(categoryValue);
  };
  const [noJobs, setNoJobs] = useState(false);
  const filterJobsByCategory = (category) => {
    if (category === "all") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => job.jobCategory === category);
      if (filtered.length == 0) {
        setNoJobs(true);
      }
      setFilteredJobs(filtered);
    }
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Ndertimtari", label: "Ndertimtari" },
    { value: "Pastrim", label: "Pastrim" },
    { value: "Hidraulik", label: "Hidraulik" },
    { value: "Mekanik", label: "Mekanik" },
    { value: "IT", label: "IT" },
  ];
  const [Allcomments, setAllComments] = useState([]);
  useEffect(() => {
    fetch("/comments")
      .then((response) => response.json())
      .then((data) => {
        setAllComments(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const [comments, setComments] = useState([]);
  const [jobOfferData, setJobOfferData] = useState([]);
  const [jobsByCategory, setJobsByCategory] = useState([]);

  useEffect(() => {
    let jobCategory = null;
    if (selectedJob) {
      jobCategory = selectedJob.jobCategory;
    }
    if (jobCategory) {
      fetch(`/jobs/category/${jobCategory}`)
          .then((res) => res.json())
          .then((data) => {
            setJobsByCategory(data);
          })
          .catch((err) => console.error(err.message));
    }
  }, [selectedJob]);

  useEffect(() => {
    let jobid = null;
    if (jobs.length > 0) {
      jobid = jobs[0].jobId;
    }
    if (selectedJob && selectedJob.jobId) {
      jobid = selectedJob.jobId;
    } else if (filteredJobs && filteredJobs[0] && filteredJobs[0].jobId) {
      jobid = filteredJobs[0].jobId;
    }

    if (jobid) {
      fetch(`/comments/${jobid}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
        })
        .catch((err) => console.error(err.message));
    }
  }, [selectedJob, filteredJobs, jobs]);
  const [jobOffers, setJobOffers] = useState([]);

  useEffect(() => {
    let jobid = null;
    if (jobs.length > 0) {
      jobid = jobs[0].jobId;
    }
    if (selectedJob && selectedJob.jobId) {
      jobid = selectedJob.jobId;
    } else if (filteredJobs && filteredJobs[0] && filteredJobs[0].jobId) {
      jobid = filteredJobs[0].jobId;
    }
    fetch(`/jobOffer/${jobid}`)
      .then((res) => res.json())
      .then((data) => {
        setJobOffers(data);
      })
      .catch((err) => console.error(err.message));
  }, [selectedJob, filteredJobs, jobs]);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const handleEdit = (offerId) => {
    const offer = jobOffers.find((c) => c.offerid === offerId);
    if (offer) {
      setEditedBidDescripition(offer.bidDescription);
    }
    setSelectedOfferId(offerId);
  };
  const [isEditingBid, setIsEditingBid] = useState(false);
  const [editedBidAmount, setEditedBidAmount] = useState("");
  const [editedBidDescripition, setEditedBidDescripition] = useState("");
  const [editingBidId, setEditingBidId] = useState(null);
  const handleSaveBid = async (offerId) => {
    try {
      const response = await fetch(`/offers/${offerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bidAmount: editedBidAmount,
          bidDescription: editedBidDescripition,
        }),
      });
      window.location.reload();
      setEditingBidId(null);

      if (response.ok) {
        console.log("ok");
        setEditedBidAmount("");
        setEditedBidDescripition("");
        setIsEditingBid(false);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const handleEditComment = (commentId) => {
    const comment = comments.find((c) => c.commentid === commentId);
    if (comment) {
      setEditedComment(comment.commentContent);
    }
  };
  const handleSaveComment = async (commentId) => {
    try {
      const response = await fetch(`/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentContent: editedComment }),
      });
      if (response.ok) {
        setEditedComment("");
        window.location.reload();
        setIsEditing(false);
        setEditingCommentId(null);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetch("/jobOffers")
      .then((response) => response.json())
      .then((data) => {
        setJobOffers(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleDelete = (offerId) => {
    console.log(offerId);
    try {
      axios
        .delete(`/jobOffer/${offerId}`)
        .then((res) => {
          setJobOffers(jobOfferData.filter((x) => x.offerid != offerId));
        })
        .catch((err) => {
          console.log("err", err.message);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteComment = (commentId) => {
    try {
      axios
        .delete(`/comments/${commentId}`)
        .then((res) => {
          setComments(comments.filter((x) => x.commentid != commentId));
        })
        .catch((err) => {
          console.log("err", err.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const handleAddToFavorites = async (job) => {

    let body =
    await axios.put("/editFavoriteJob", {
      body: {
        jobId: job.jobId,
        favoriteJobs: !job.favoriteJobs,
      }
    }).then(() => {
      setJobs(
          jobs.map(x=> {
            if(x.jobId == job.jobId) {
              x.favoriteJobs = !x.favoriteJobs;
            }
            return x;
          })
      );
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <>
      <header>{/* <Navbar /> */}</header>
      <div className="flex w-auto h-full">
        <div
          className="h-900 w-1/5 bg-gray-200 overflow-y-scroll scrollbar-rounded"
          style={{ height: "900px" }}
        >
          <div className="flex flex-col justify-center items-center rounded-lg shadow-md w-full mx-auto">
            <h2 className="font-light text-3xl ml-2 mt-4">Jobs</h2>
            <div className="mt-4 ml-2 flex justify-between gap-4">
              <p className="">Total jobs: {totalJobs}</p>

              <div className="relative inline-block">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleDropdownToggle}
                >
                  <span>Sort</span>
                  <BsSliders size={18} />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute z-10 mt-2 w-52 bg-white border border-gray-300 rounded shadow-lg"
                    onClick={() => setSelectedJob(null)}
                  >
                    <ul className="py-2">
                      {categories.map((category) => (
                        <li
                          key={category.value}
                          className={`px-4 py-2 cursor-pointer ${
                            selectedCategory === category.value
                              ? "bg-blue-200"
                              : ""
                          }`}
                          onClick={() =>
                            handleCategoryChange({
                              target: { value: category.value },
                            })
                          }
                        >
                          {category.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search jobs by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button
              onClick={handleSearch}
              className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-opacity-80 transition duration-300 ease-in-out"
            >
              Search
            </button>

            {(isFiltering ? filteredJobs : jobs).map((job) => {
              const title = job.jobTitle || ""; // Handle undefined job.title
              console.log(' job' , job)
              if (
                !searchTerm ||
                title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return (
                  <div
                    key={job.jobId}
                    className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md cursor-pointer w-11/12 mx-auto my-5 transform hover:scale-105"
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="w-full rounded-t-lg bg-indigo-500 flex justify-between items-center px-6 py-3">
                      <img
                        src={`data:image/jpeg;base64, ${job.userProfilePicture}`}
                        className="h-12 w-12 rounded-full"
                        alt="User Profile"
                      />
                      <h4 className="mt-2 text-xl font-bold text-white">
                        {job.username}
                      </h4>
                    </div>
                    <div className="flex flex-col w-3/4 mr-24 p-6">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {job.jobTitle}
                      </h2>
                      <div className="flex items-center mb-4">
                        <MdOutlineInfo
                          size={24}
                          className="text-indigo-500 mr-2"
                        />
                        <p className="text-lg text-indigo-500 font-medium">
                          {job.jobCategory}
                        </p>
                      </div>
                      <div className="w-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                          {job.jobCity}
                        </h2>
                        <span className="text-xl text-indigo-500 font-medium mb-6">
                          {job.jobPrice}
                        </span>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center mt-7">
                            <button className="bg-indigo-500 text-white w-56 font-bold py-3 px-8 border border-indigo-500 rounded-full hover:bg-indigo-700 hover:text-gray-200 transition duration-300 ease-in-out mr-4">
                              Jep Oferten
                            </button>
                            <button
                              className="bg-white text-indigo-500 font-bold py-3 px-6 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
                              onClick={() => handleAddToFavorites(job)}
                            >
                              {job.favoriteJobs ? (
                                <FaHeart size={26} />
                              ) : (
                                <FaRegHeart size={26} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
            <div class="flex flex-col items-center">
              <span class="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  1
                </span>{" "}
                to{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  10
                </span>{" "}
                of{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  100
                </span>{" "}
                Entries
              </span>
              <div class="inline-flex mt-2 xs:mt-0">
                <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <footer class="flex flex-col items-center justify-between bg-gray-200 py-2 px-4">
            <div>
              <a href="#" class="text-gray-600 hover:text-gray-800">
                Terms of Use
              </a>
              <span class="text-gray-600 mx-2">|</span>
              <a href="#" class="text-gray-600 hover:text-gray-800">
                Privacy Policy
              </a>
            </div>
            <div class="text-gray-600">© TradeBridge.com, Inc.</div>
          </footer>
        </div>
        {/* Adjust the flex properties of this div */}
        <div className="w-3/4 flex justify-center">
          {/* Content for the right div */}
          {selectedJob ? (
            <div className="rounded-lg h-full w-full  ">
              <div className="flex justify-between my-7 mx-6 ">
                <div className=" h-1/4 w-1/2 mx-9">
                  <div className="mt-10  h-20 flex items-center">
                    <img
                      src={`data:image/jpeg;base64, ${selectedJob.userProfilePicture}`}
                      className="w-44 h-44 mb-8"
                    />
                  </div>
                  <div className="mt-7">
                    <h3 className=" font-extralight text-2xl">
                      Posted by:
                      {selectedJob.username}
                    </h3>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-2xl">
                      Category:{selectedJob.jobCategory}
                    </h3>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-4xl">
                      Title:{selectedJob.jobTitle}
                    </h3>
                  </div>
                  <div className="mt-3">
                    <p className=" text-l font-semibold">
                      City:{selectedJob.jobCity}
                    </p>
                  </div>
                  <div className="mt-3 ml-2">
                    <button className=" bg-white text-sm border border-black font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                      Start Today
                    </button>
                  </div>
                  <div class="my-4 border-b border-gray-500 w-1/2"></div>
                  <div className="mt-3 flex justify-between w-1/2 text-2xl">
                    <p className="text-2xl font-bold">Job Type </p>
                    <p className=" text-lg font-light">{selectedJob.jobType}</p>
                  </div>
                  <div class="my-4 border-b border-gray-500 w-1/2"></div>
                  <div className="mt-3 flex justify-between w-1/2 text-2xl">
                    <p className=" text-2xl font-bold">Hours </p>
                    <p className=" text-lg font-light">Set own</p>
                  </div>

                  <div className="flex mt-5">
                    {/* Nese useri osht logged in me account qe e ka postu punen ather smunet me bo bid produktit t'vet veq me fshi */}
                    {useri === selectedJob.username ||
                    user.usertype === "punedhenes" ? (
                      <div className="flex mt-4 space-x-4"></div>
                    ) : (
                      <div>
                        <form action="/jobsearch" method="POST">
                          <div class="my-5">
                            <div class="mt-2 flex flex-col ">
                              <div className="flex justify-between">
                                <label
                                  htmlFor="bidAmount"
                                  className="block text-xl font-semibold"
                                >
                                  Place Your Bid:
                                  <br />
                                </label>
                                <input
                                  type="number"
                                  id="jobPrice"
                                  name="jobPrice"
                                  className="w-40 items-center px-4 py-2 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-md h-10"
                                  placeholder="Enter amount"
                                  required
                                />

                                <div className="ml-2 flex">
                                  <button className="bg-white items-center h-11 text-indigo-500 flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                                    <FaHeart
                                      size={26}
                                      icon="fa-regular fa-heart"
                                    />
                                  </button>
                                </div>
                              </div>

                              <div class="flex flex-col ">
                                <label
                                  for="bidDescription"
                                  class="block text-xl font-semibold"
                                >
                                  Bid Description
                                </label>
                                <textarea
                                  id="bidDescription"
                                  name="bidDescription"
                                  class="w-96 px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-md h-24"
                                  placeholder="Enter description"
                                ></textarea>
                              </div>
                              <input
                                type="hidden"
                                id="jobId"
                                name="jobId"
                                value={selectedJob.jobId}
                              />
                              <input
                                type="hidden"
                                id="userId"
                                name="userId"
                                value={user?.userid}
                              />
                              <button
                                type="submit"
                                class="px-6 mt-3 py-2 bg-indigo-500 text-white font-bold rounded-r-md hover:bg-indigo-600 transition duration-300 ease-in-out shadow-md"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex border border-gray-100 shadow-2xl flex-col mr-10">
                    <img
                      className=""
                      style={{ height: "750px" }}
                      src={`data:image/jpeg;base64,${selectedJob.jobPhoto}`}
                      alt="Job Photo"
                    />
                  </div>
                  <div class="flex justify-center mt-2"></div>
                </div>
              </div>

              {jobOffers.length === 0 ? (
                <></>
              ) : (
                <h2 className="text-2xl text-center font-bold">
                  Bids for this Job:
                </h2>
              )}
              <div className="flex justify-between">
                {jobOffers.map((offer) => (
                  <div className="mt-8 w-1/3" key={offer.idoffer}>
                    <ul className="mt-4 space-y-4">
                      <li className="border border-gray-300 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col">
                            <p className="text-lg font-bold">
                              Bid From: {offer.username}
                            </p>
                            <p className="text-sm text-gray-500">
                              Bid Date: {offer.bidTime}
                            </p>
                          </div>
                          <p className="text-xl font-bold">
                            Bid Amount:
                            <br />
                            {isEditingBid ? <></> : <>${offer.jobOffer}</>}
                          </p>
                        </div>
                        <p className="text-xl font-light">
                          Bid Description:
                          <br />
                          {isEditingBid && offer.idoffer === editingBidId ? (
                            <> </>
                          ) : (
                            <>{offer.bidDescription}</>
                          )}
                        </p>

                        {/* Nese useri qe osht logged in e ka bo oferten munet me bo delete ose edit oferten e vet */}
                        {useri === offer.username ? (
                          <div className="flex mt-4 space-x-4">
                            {isEditingBid && offer.idoffer === editingBidId ? (
                              <>
                                <div>
                                  <label htmlFor="editedBidDescription">
                                    Bid Description:
                                  </label>
                                  <input
                                    type="text"
                                    id="editedBidDescription"
                                    placeholder="Enter your new Bid Description"
                                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:border-blue-500"
                                    value={editedBidDescripition}
                                    onChange={(e) =>
                                      setEditedBidDescripition(e.target.value)
                                    }
                                  />
                                  <br />
                                  <label htmlFor="editedBidAmount">
                                    Bid Amount:
                                  </label>
                                  <input
                                    type="number"
                                    id="editedBidAmount"
                                    placeholder="Enter your new Bid Amount"
                                    className="p-2 border-2 border-black rounded-lg focus:outline-none ml-6 focus:border-blue-500"
                                    value={editedBidAmount}
                                    onChange={(e) =>
                                      setEditedBidAmount(e.target.value)
                                    }
                                  />
                                  <br />
                                  <button
                                    className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                      handleSaveBid(offer.idoffer);
                                      setIsEditingBid(false);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => {
                                    handleEdit(offer.idoffer);
                                    setEditingBidId(offer.idoffer);
                                    setIsEditingBid(true);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleDelete(offer.idoffer)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        ) : (
                          <div>
                            {useri === selectedJob.username && (
                              <div className="flex mt-4 space-x-4">
                                <button
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleDelete(offer.idoffer)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border"></div>

              <div className=" flex justify-between">
                <div className="w-1/2 pr-4 border-r">
                  <h3 className="text-center cursor-pointer">About this Job</h3>
                  <div className="flex justify-center">
                    <div className="my-4 text-center border-b-4 cursor-pointer border-gray-500 hover:border-2 hover:border-indigo-500 w-1/2"></div>
                  </div>
                  <div className="">
                    <h2 className="text-l font-light mt-3">
                      {selectedJob.jobDescription}
                    </h2>
                  </div>
                </div>
                <div className="w-1/2">
                  <h3 className="text-center">Comments</h3>
                  <div className="flex justify-center">
                    <div className="my-4 text-center border-b-4 cursor-pointer border-gray-500 hover:border-2 hover:border-indigo-500 w-1/2"></div>
                  </div>
                  <div className="flex flex-col gap-4 p-4">
                    {comments.map((comment) => (
                      <div
                        className="flex flex-col gap-2"
                        key={comment.commentid}
                      >
                        <div className="flex items-center gap-2">
                          <div>
                            <h4>{comment.username}</h4>
                          </div>
                          <img
                            src={`data:image/jpeg;base64,${comment.userProfilePicture}`}
                            className="w-8 h-8 rounded-full"
                            alt="My Image"
                          />
                        </div>
                        {isEditing && editingCommentId === comment.commentid ? (
                          <></>
                        ) : (
                          <>
                            <p className="text-black">
                              {comment.commentContent}
                            </p>
                          </>
                        )}
                        {isEditing && comment.commentid === editingCommentId ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              className="p-2 border-2 border-black rounded-lg focus:outline-none focus:border-blue-500"
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                            />
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                handleSaveComment(comment.commentid);
                              }}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <>
                            {useri === comment.username ? (
                              <div>
                                <div className="flex mt-4 space-x-4 justify-end">
                                  <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                      handleEditComment(comment.commentid);
                                      setEditingCommentId(comment.commentid);
                                      setIsEditing(true);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() =>
                                      handleDeleteComment(comment.commentid)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  {useri === selectedJob.username && (
                                    <div className="flex  justify-end  space-x-4">
                                      <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() =>
                                          handleDeleteComment(comment.commentid)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ))}

                    <form
                      action="/commentForm"
                      method="POST"
                      className="flex flex-col gap-2"
                    >
                      <input type="hidden" name="userId" value={user?.userid} />
                      <input
                        type="hidden"
                        name="jobId"
                        value={selectedJob.jobId}
                      />
                      <textarea
                        placeholder="Leave a comment"
                        className="p-2 rounded-lg"
                        name="commentContent"
                        required
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                      >
                        Post Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="my-4 border-b border-gray-200 w-full"></div>
              <div className="ml-3">
                <h3 className="font-bold text-xl text-center">Similar Jobs</h3>
              </div>
              <div className="flex justify-between">
                {jobsByCategory.map((job) => (
                  <div
                    key={job.jobId}
                    className="rounded-lg bg-gray-100 p-6 shadow-md h-80 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="flex items-center">
                      <div>
                        <img
                          src={`data:image/jpeg;base64, ${job.userProfilePicture}`}
                          className="w-16 h-16 rounded-full"
                          alt="User Profile"
                        />
                      </div>
                      <div className="ml-auto">
                        <h2 className="text-2xl font-bold text-gray-800">
                          {job.jobCategory}
                        </h2>
                        <div className="flex items-center mt-1">
                          <MdOutlineInfo className="text-blue-500" />
                          <p className="ml-1 text-gray-600">View More Info</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        {job.jobTitle}
                      </h2>
                      <p className="text-gray-600 font-extrabold text-2xl">
                        {job.username}
                      </p>
                    </div>
                    <div className="flex justify-between mt-24">
                      <button className="bg-indigo-500 text-white flex justify-center font-bold py-3 px-8 rounded-full hover:bg-indigo-600 hover:text-white border border-indigo-500 transition duration-300 ease-in-out">
                        <FaHeart size={26} />
                        <p className="ml-1">Jep Oferten</p>
                      </button>
                      <button className="bg-blue-500 text-white flex justify-center font-bold py-3 px-8 rounded-full hover:bg-blue-600 hover:text-white border border-blue-500 transition duration-300 ease-in-out">
                        <p>Start Today</p>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              {filteredJobs.length > 0 ? (
                <div className="rounded-lg h-full w-full">
                  <div className="flex justify-between my-7 mx-6">
                    <div className=" h-1/4 w-1/2 mx-9">
                      <div className="mt-10  h-20 flex items-center">
                        <img
                          src={`data:image/jpeg;base64, ${filteredJobs[0].userProfilePicture}`}
                          className="w-44 h-44 mb-8"
                        />
                      </div>
                      <div className="mt-7">
                        <h3 className=" font-extralight text-2xl">
                          Posted by:
                          {filteredJobs[0]?.username}
                        </h3>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-bold text-2xl">
                          Category:{filteredJobs[0].jobCategory}
                        </h3>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-bold text-4xl">
                          Title:{filteredJobs[0].jobTitle}
                        </h3>
                      </div>
                      <div className="mt-3">
                        <p className=" text-l font-semibold">
                          City:{filteredJobs[0].jobCity}
                        </p>
                      </div>
                      <div className="mt-3 ml-2">
                        <button className=" bg-white text-sm border border-black font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                          Start Today
                        </button>
                      </div>
                      <input
                        type="hidden"
                        value={filteredJobs[0].jobId}
                      ></input>
                      <div class="my-4 border-b border-gray-500 w-1/2"></div>
                      <div className="mt-3 flex justify-between w-1/2 text-2xl">
                        <p className="text-2xl font-bold">Job Type </p>
                        <p className=" text-lg font-light">
                          {filteredJobs[0].jobType}
                        </p>
                      </div>
                      <div class="my-4 border-b border-gray-500 w-1/2"></div>
                      <div className="mt-3 flex justify-between w-1/2 text-2xl">
                        <p className=" text-2xl font-bold">Hours </p>
                        <p className=" text-lg font-light">Set own</p>
                      </div>
                      <div className="flex mt-5">
                        {/* Nese useri osht logged in me account qe e ka postu punen ather smunet me bo bid produktit t'vet veq me fshi */}
                        {useri === filteredJobs[0].username ||
                        user.usertype === "punedhenes" ? (
                          <div className="flex mt-4 space-x-4"></div>
                        ) : (
                          <div>
                            <form action="/jobsearch" method="POST">
                              <div class="my-5">
                                <div class="mt-2 flex flex-col ">
                                  <div className="flex justify-between">
                                    <label
                                      htmlFor="bidAmount"
                                      className="block text-xl font-semibold"
                                    >
                                      Place Your Bid:
                                      <br />
                                    </label>
                                    <input
                                      type="number"
                                      id="jobPrice"
                                      name="jobPrice"
                                      className="w-40 items-center px-4 py-2 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-md h-10"
                                      placeholder="Enter amount"
                                      required
                                    />

                                    <div className="ml-2 flex">
                                      <button className="bg-white items-center h-11 text-indigo-500 flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                                        <FaHeart
                                          size={26}
                                          icon="fa-regular fa-heart"
                                        />
                                      </button>
                                    </div>
                                  </div>

                                  <div class="flex flex-col ">
                                    <label
                                      for="bidDescription"
                                      class="block text-xl font-semibold"
                                    >
                                      Bid Description
                                    </label>
                                    <textarea
                                      id="bidDescription"
                                      name="bidDescription"
                                      class="w-96 px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-md h-24"
                                      placeholder="Enter description"
                                      required
                                    ></textarea>
                                  </div>
                                  <input
                                    type="hidden"
                                    id="jobId"
                                    name="jobId"
                                    value={filteredJobs[0].jobId}
                                  />
                                  <input
                                    type="hidden"
                                    id="userId"
                                    name="userId"
                                    value={user?.userid}
                                  />
                                  <button
                                    type="submit"
                                    class="px-6 mt-3 py-2 bg-indigo-500 text-white font-bold rounded-r-md hover:bg-indigo-600 transition duration-300 ease-in-out shadow-md"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex shadow-2xl flex-col mr-10">
                        <img
                          className=""
                          style={{ height: "750px" }}
                          src={`data:image/jpeg;base64,${filteredJobs[0].jobPhoto}`}
                          alt="Job Photo"
                        />
                      </div>
                    </div>
                  </div>
                  {jobOffers.length === 0 ? (
                    <></>
                  ) : (
                    <h2 className="text-2xl text-center font-bold">
                      Bids for this Job:
                    </h2>
                  )}
                  <div className="flex justify-between">
                    {jobOffers.map((offer) => (
                      <div className="mt-8 w-1/3" key={offer.idoffer}>
                        <ul className="mt-4 space-y-4">
                          <li className="border border-gray-300 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col">
                                <p className="text-lg font-bold">
                                  Bid From: {offer.username}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Bid Date: {offer.bidTime}
                                </p>
                              </div>
                              <p className="text-xl font-bold">
                                Bid Amount:
                                <br />
                                {isEditingBid ? <></> : <>${offer.jobOffer}</>}
                              </p>
                            </div>
                            <p className="text-xl font-light">
                              Bid Description:
                              <br />
                              {isEditingBid &&
                              editingBidId === offer.offerid ? (
                                <></>
                              ) : (
                                <>{offer.bidDescription}</>
                              )}
                            </p>

                            {/* Nese useri qe osht logged in e ka bo oferten munet me bo delete ose edit oferten e vet */}
                            {useri === offer.username ? (
                              <div className="flex mt-4 space-x-4">
                                {isEditingBid &&
                                editingBidId === offer.offerid ? (
                                  <>
                                    <div>
                                      <label htmlFor="editedBidDescription">
                                        Bid Description:
                                      </label>
                                      <input
                                        type="text"
                                        id="editedBidDescription"
                                        placeholder="Enter your new Bid Description"
                                        className="p-2 border-2 border-black rounded-lg focus:outline-none focus:border-blue-500"
                                        value={editedBidDescripition}
                                        onChange={(e) =>
                                          setEditedBidDescripition(
                                            e.target.value
                                          )
                                        }
                                      />
                                      <br />
                                      <label htmlFor="editedBidAmount">
                                        Bid Amount:
                                      </label>
                                      <input
                                        type="number"
                                        id="editedBidAmount"
                                        placeholder="Enter your new Bid Amount"
                                        className="p-2 border-2 border-black rounded-lg focus:outline-none ml-6 focus:border-blue-500"
                                        value={editedBidAmount}
                                        onChange={(e) =>
                                          setEditedBidAmount(e.target.value)
                                        }
                                      />
                                      <br />

                                      <button
                                        className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                          handleSaveBid(offer.idoffer);
                                          setIsEditingBid(false);
                                        }}
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() => {
                                        handleEdit(offer.idoffer);
                                        setIsEditingBid(offer.idoffer);
                                        setIsEditingBid(true);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() =>
                                        handleDelete(offer.idoffer)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            ) : (
                              <div>
                                {useri === filteredJobs[0].username && (
                                  <div className="flex mt-4 space-x-4">
                                    <button
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() =>
                                        handleDelete(offer.idoffer)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="border"></div>
                  <div className="flex justify-between">
                    <div className="w-1/2 border-r pr-4">
                      <h3 className="text-center cursor-pointer">
                        {" "}
                        About this Job{" "}
                      </h3>
                      <div className="flex justify-center">
                        <div className="my-4 text-center border-b-4 cursor-pointer  border-gray-500 hover:border-2 hover:border-indigo-500 w-1/2"></div>
                      </div>
                      <div className="">
                        <h2 className="text-l font-light mt-3">
                          {filteredJobs[0].jobDescription}
                        </h2>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <h3 className="text-center">Comments</h3>
                      <div className="flex justify-center">
                        <div className="my-4 text-center border-b-4 cursor-pointer  border-gray-500 hover:border-2 hover:border-indigo-500 w-1/2"></div>
                      </div>
                      <div className="flex flex-col gap-4 p-4">
                        {comments.map((comment) => (
                          <div
                            className="flex flex-col gap-2"
                            key={comment.commentid}
                          >
                            <div className="flex items-center gap-2">
                              <div>
                                <h4>{comment.username}</h4>
                              </div>
                              <img
                                src={`data:image/jpeg;base64,${comment.userProfilePicture}`}
                                className="w-8 h-8 rounded-full"
                                alt="My Image"
                              />
                            </div>
                            {isEditing &&
                            editingCommentId === comment.commentid ? (
                              <> </>
                            ) : (
                              <p className="text-black">
                                {comment.commentContent}
                              </p>
                            )}

                            {isEditing &&
                            editingCommentId === comment.commentid ? (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="p-2 border-2 border-black rounded-lg focus:outline-none focus:border-blue-500"
                                  value={editedComment}
                                  onChange={(e) =>
                                    setEditedComment(e.target.value)
                                  }
                                />
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() =>
                                    handleSaveComment(comment.commentid)
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <>
                                {useri === comment.username ? (
                                  <div>
                                    <div className="flex mt-4 space-x-4 justify-end">
                                      <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                          handleEditComment(comment.commentid);
                                          setEditingCommentId(
                                            comment.commentid
                                          );
                                          setIsEditing(true);
                                        }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() =>
                                          handleDeleteComment(comment.commentid)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div>
                                      {useri === filteredJobs[0].username && (
                                        <div className="flex  justify-end  space-x-4">
                                          <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() =>
                                              handleDeleteComment(
                                                comment.commentid
                                              )
                                            }
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                        <form
                          action="/commentForm"
                          method="POST"
                          className="flex flex-col gap-2"
                        >
                          <input
                            type="hidden"
                            name="userId"
                            value={user?.userid}
                          />
                          <input
                            type="hidden"
                            name="jobId"
                            value={filteredJobs[0].jobId}
                          />
                          <textarea
                            placeholder="Leave a comment"
                            className="p-2 rounded-lg"
                            name="commentContent"
                            required
                          ></textarea>
                          <button
                            type="submit"
                            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                          >
                            Post Comment
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg h-full w-full">
                  {noJobs ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                      <div className="flex justify-between ">
                        <p className="text-red-500 font-semibold ">
                          There is no Job with this Category
                        </p>
                        <AiOutlineInfoCircle
                          className="ml-2 mt-1 text-gray-500"
                          size={20}
                        />
                      </div>
                      <FaSadCry size={300} className="text-5xl text-gray-500" />
                    </div>
                  ) : (
                    <div className="rounded-lg h-full w-full">
                      {/* Add the rest of your code here */}

                      {jobs.length > 0 && (
                        <>
                          <div className="flex justify-between my-7 mx-6">
                            <div className=" h-1/4 w-1/2 mx-9">
                              <div className="mt-10  h-20 flex items-center">
                                <img
                                  src={`data:image/jpeg;base64, ${jobs[0].userProfilePicture}`}
                                  className="w-44 h-44 rounded-full mb-8"
                                />
                              </div>
                              <div className="mt-6">
                                <h3 className=" font-extralight text-2xl">
                                  Posted by:
                                  {jobs[0]?.username}
                                </h3>
                              </div>
                              <div className="mt-3">
                                <h3 className="font-bold text-2xl">
                                  Category:{jobs[0].jobCategory}
                                </h3>
                              </div>
                              <div className="mt-3">
                                <h3 className="font-bold text-4xl">
                                  Title:{jobs[0].jobTitle}
                                </h3>
                              </div>
                              <div className="mt-3">
                                <p className=" text-l font-semibold">
                                  City:{jobs[0].jobCity}
                                </p>
                              </div>
                              <div className="mt-3 ml-2">
                                <button className=" bg-white text-sm border border-black font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                                  Start Today
                                </button>
                              </div>
                              <div class="my-4 border-b border-gray-500 w-1/2"></div>
                              <div className="mt-3 flex justify-between w-1/2 text-2xl">
                                <p className="text-2xl font-bold">Job Type </p>
                                <p className=" text-lg font-light">
                                  {jobs[0].jobType}
                                </p>
                              </div>
                              <div class="my-4 border-b border-gray-500 w-1/2"></div>
                              <div className="mt-3 flex justify-between w-1/2 text-2xl">
                                <p className=" text-2xl font-bold">Hours </p>
                                <p className=" text-lg font-light">Set own</p>
                              </div>
                              <div className="flex mt-5">
                                {/* Nese useri osht logged in me account qe e ka postu punen ather smunet me bo bid produktit t'vet veq me fshi */}
                                {useri === jobs[0].username ||
                                user.usertype === "punedhenes" ? (
                                  <div className="flex mt-4 space-x-4"></div>
                                ) : (
                                  <div>
                                    <form action="/jobsearch" method="POST">
                                      <div class="my-5">
                                        <div class="mt-2 flex flex-col ">
                                          <div className="flex justify-between">
                                            <label
                                              htmlFor="bidAmount"
                                              className="block text-xl font-semibold"
                                            >
                                              Place Your Bid:
                                              <br />
                                            </label>
                                            <input
                                              type="number"
                                              id="jobPrice"
                                              name="jobPrice"
                                              className="w-40 items-center px-4 py-2 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-md h-10"
                                              placeholder="Enter amount"
                                              required
                                            />

                                            <div className="ml-2 flex">
                                              <button className="bg-white items-center h-11 text-indigo-500 flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                                                <FaHeart
                                                  size={26}
                                                  icon="fa-regular fa-heart"
                                                />
                                              </button>
                                            </div>
                                          </div>

                                          <div class="flex flex-col ">
                                            <label
                                              for="bidDescription"
                                              class="block text-xl font-semibold"
                                            >
                                              Bid Description
                                            </label>
                                            <textarea
                                              id="bidDescription"
                                              name="bidDescription"
                                              class="w-96 px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-md h-24"
                                              placeholder="Enter description"
                                            ></textarea>
                                          </div>
                                          <input
                                            type="hidden"
                                            id="jobId"
                                            name="jobId"
                                            value={jobs[0].jobId}
                                          />
                                          <input
                                            type="hidden"
                                            id="userId"
                                            name="userId"
                                            value={user?.userid}
                                          />
                                          <button
                                            type="submit"
                                            class="px-6 mt-3 py-2 bg-indigo-500 text-white font-bold rounded-r-md hover:bg-indigo-600 transition duration-300 ease-in-out shadow-md"
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="flex shadow-2xl flex-col mr-10">
                                {jobs.length > 0 && (
                                  <img
                                    className=""
                                    style={{ height: "750px" }}
                                    src={`data:image/jpeg;base64,${jobs[0].jobPhoto}`}
                                    alt="Job Photo"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          {jobOffers.length === 0 ? (
                            <></>
                          ) : (
                            <h2 className="text-2xl text-center font-bold">
                              Bids for this Job:
                            </h2>
                          )}
                          <div className="flex justify-between">
                            {jobOffers.map((offer) => (
                              <div className="mt-8 w-1/3" key={offer.idoffer}>
                                <ul className="mt-4 space-y-4">
                                  <li className="border border-gray-300 rounded-lg p-4">
                                    <div className="flex items-start justify-between">
                                      <div className="flex flex-col">
                                        <p className="text-lg font-bold">
                                          Bid From: {offer.username}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Bid Date: {offer.bidTime}
                                        </p>
                                      </div>
                                      <p className="text-xl font-bold">
                                        Bid Amount:
                                        <br />
                                        {isEditingBid ? (
                                          <></>
                                        ) : (
                                          <>${offer.jobOffer}</>
                                        )}
                                      </p>
                                    </div>
                                    <p className="text-xl font-light">
                                      Bid Description:
                                      <br />
                                      {isEditingBid ? (
                                        <></>
                                      ) : (
                                        <>{offer.bidDescription}</>
                                      )}
                                    </p>

                                    {/* Nese useri qe osht logged in e ka bo oferten munet me bo delete ose edit oferten e vet */}
                                    {useri === offer.username ? (
                                      <div className="flex mt-4 space-x-4">
                                        {isEditingBid ? (
                                          <>
                                            <div>
                                              <label htmlFor="editedBidDescription">
                                                Bid Description:
                                              </label>
                                              <input
                                                type="text"
                                                id="editedBidDescription"
                                                placeholder="Enter your new Bid Description"
                                                className="p-2 border-2 border-black rounded-lg focus:outline-none focus:border-blue-500"
                                                value={editedBidDescripition}
                                                onChange={(e) =>
                                                  setEditedBidDescripition(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              <br />
                                              <label htmlFor="editedBidAmount">
                                                Bid Amount:
                                              </label>
                                              <input
                                                type="number"
                                                id="editedBidAmount"
                                                placeholder="Enter your new Bid Amount"
                                                className="p-2 border-2 border-black rounded-lg focus:outline-none ml-6 focus:border-blue-500"
                                                value={editedBidAmount}
                                                onChange={(e) =>
                                                  setEditedBidAmount(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              <br />

                                              <button
                                                className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
                                                onClick={() => {
                                                  handleSaveBid(offer.idoffer);
                                                  setIsEditingBid(false);
                                                }}
                                              >
                                                Save
                                              </button>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                              onClick={() => {
                                                handleEdit(offer.idoffer);
                                                setIsEditingBid(true);
                                              }}
                                            >
                                              Edit
                                            </button>
                                            <button
                                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                              onClick={() =>
                                                handleDelete(offer.idoffer)
                                              }
                                            >
                                              Delete
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    ) : (
                                      <div>
                                        {useri === jobs[0].username && (
                                          <div className="flex mt-4 space-x-4">
                                            <button
                                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                              onClick={() =>
                                                handleDelete(offer.idoffer)
                                              }
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </li>
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="border"></div>

                          <div className=" flex justify-between">
                            <div className=" w-1/2 border-r pr-4">
                              <h3 className="text-center cursor-pointer">
                                {" "}
                                About this Job{" "}
                              </h3>
                              <div className="flex justify-center">
                                <div className="my-4 text-center border-b-4 cursor-pointer  border-gray-500 hover:border-2 hover:border-indigo-500 w-1/2"></div>
                              </div>
                              <div className="">
                                <h2 className="text-l font-light mt-3">
                                  {jobs[0].jobDescription}
                                </h2>
                              </div>
                            </div>
                            <div className="w-1/2">
                              <h3 className="text-center">Comments</h3>
                              <div className="flex justify-center">
                                <div className="my-4 text-center border-b-4 cursor-pointer  border-gray-500 hover:border-2 hover:border-indigo-500 w-1/2"></div>
                              </div>
                              <div className="flex flex-col gap-4 p-4">
                                {comments.map((comment) => (
                                  <div
                                    className="flex flex-col gap-2"
                                    key={comment.commentid}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div>
                                        <h4>{comment.username}</h4>
                                      </div>
                                      <img
                                        src={`data:image/jpeg;base64,${comment.userProfilePicture}`}
                                        className="w-8 h-8 rounded-full"
                                        alt="My Image"
                                      />
                                    </div>

                                    {isEditing &&
                                    editingCommentId === comment.commentid ? (
                                      <> </>
                                    ) : (
                                      <p className="text-black">
                                        {comment.commentContent}
                                      </p>
                                    )}

                                {isEditing && editingCommentId === comment.commentid ? (
                                <div className="flex gap-2">
                                  <input
                                      type="text"
                                      className="p-2 border-2 border-black rounded-lg focus:outline-none focus:border-blue-500"
                                      value={editedComment}
                                      onChange={(e) =>
                                        setEditedComment(e.target.value)
                                      }
                                    />
                                    <button
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() =>
                                        handleSaveComment(comment.commentid)
                                      }
                                    >
                                      Save
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    {useri === comment.username ? (
                                      <div>
                                        <div className="flex mt-4 space-x-4 justify-end">
                                          <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => {
                                              handleEditComment(
                                                comment.commentid
                                              );
                                              setEditingCommentId(comment.commentid);
                                              setIsEditing(true);
                                            }}
                                          >
                                            Edit
                                          </button>
                                          <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() =>
                                              handleDeleteComment(
                                                comment.commentid
                                              )
                                            }
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        <div>
                                          {useri === jobs[0].username && (
                                            <div className="flex  justify-end  space-x-4">
                                              <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() =>
                                                  handleDeleteComment(
                                                    comment.commentid
                                                  )
                                                }
                                              >
                                                Delete
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                            {/* Comment form */}
                            <form
                              action="/commentForm"
                              method="POST"
                              className="flex flex-col gap-2"
                            >
                              <input
                                type="hidden"
                                name="userId"
                                value={user?.userid}
                              />
                              <input
                                type="hidden"
                                name="jobId"
                                value={jobs[0]?.jobId}
                              />
                              <textarea
                                placeholder="Leave a comment"
                                className="p-2 rounded-lg"
                                name="commentContent"
                                required
                              ></textarea>
                              <button
                                type="submit"
                                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                              >
                                Post Comment
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobSearch;
