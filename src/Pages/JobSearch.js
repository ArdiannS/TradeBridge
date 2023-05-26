import React, { useState, useEffect } from "react";
import { FaFacebook, FaHeart } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import First from "../images/bgImg.jpeg";
import Second from "../images/foto1.jpg";
import Third from "../images/login.jpg";
import Fourth from "../images/logoo2.png";

// import { HiOutlineArrowsExpand  } from 'react-icons/hi';
import { MdOutlineInfo } from "react-icons/md";
import { BsSliders } from "react-icons/bs";
import Footer from "../Components/Footer";
import axios from "../api/axiosInstance";
const user = JSON.parse(localStorage.getItem("user"));
console.log("user", user);
function JobSearch() {
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

  function jobCategory(jobCategoryData) {
    console.log("jobCategory1", jobCategoryData);

    fetch("/jobsearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobCategory: jobCategoryData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        const container = document.getElementById("jobsContainer");
        container.innerHTML = "";

        data.forEach((job) => {
          const jobDiv = document.createElement("div");
          jobDiv.setAttribute("key", job.jobId);
          jobDiv.addEventListener("click", () => {
            handleJobClick(job);
          });

          const key = jobDiv.getAttribute("key");

          jobDiv.className = `
          h-full rounded-lg w-1/3 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3
        `;

          jobDiv.innerHTML = `
        <div class="rounded-lg mt-5" data-key="${job.jobId}">
          <div class="mt-5 flex justify-between items-center">
            <div class="">
              <FaFacebook size={43} class="ml-4 mt-4" />
            </div>
            <div class="ml-auto">
              <h2 class="ml-4 mt-4 mr-4 text-3xl font-mono">
                ${job.jobCategory}
              </h2>
              <div class="flex">
                <MdOutlineInfo class="ml-4 mt-4 text-blue-500" />
                <p class="pt-2 px-1">per hour</p>
              </div>
            </div>
          </div>
          <div class="mt-7">
            <h2 class="font-bold text-2xl ml-2">
              ${job.jobTitle}
            </h2>
            <span class="font-light text-xl ml-2">DoorDash</span>
            <div class="mt-3 ml-2">
              <button class="bg-white border border-black font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                Start Today
              </button>
            </div>
            <div class="flex mt-5 bg-slate-600 justify-center">
              <div class="mt-3 w-full-10">
                <button class="bg-indigo-500 text-white flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300 ease-in-out">
                  <p>Apply</p>
                </button>
              </div>
              <div class="mt-3 ml-2">
              <button class="bg-indigo-500 text-white flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300 ease-in-out">
              <FaHeart size={26} icon="fa-regular fa-heart" />
              <p>Jep Oferten</p>

                </button>
              </div>
            </div>
          </div>
        </div>
      `;
          container.appendChild(jobDiv);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    setSelectedJob();
  }, []);

  console.log("userid", user?.userid);

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
    console.log(selectedJob);
    console.log(jobId);
  }
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        console.log(data);
      })
      .catch((err) => console.error(err.message));
  }, []);
  console.log(jobs[0]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

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
  const filterJobsByCategory = (category) => {
    if (category === "all") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => job.jobCategory === category);
      setFilteredJobs(filtered);
    }
  };
  console.log(filteredJobs[0]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Ndertimtari", label: "Ndertimtari" },
    { value: "Pastrim", label: "Pastrim" },
    { value: "Hidraulik", label: "Hidraulik" },
    { value: "Mekanik", label: "Mekanik" },
  ];
  const [filtering, setFiltering] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    fetch("/dashboard/total-jobs")
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setTotalJobs(parseInt(data));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <header>{/* <Navbar /> */}</header>
      <div className="flex h-full">
        <div
          className="h-900 w-1/3 bg-slate-400"
          style={{ overflowY: "scroll", height: "900px" }}
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
              if (
                !searchTerm ||
                title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return (
                  <div
                    key={job.jobId}
                    className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md cursor-pointer w-4/8 mx-auto my-5"
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="w-full rounded-t-lg bg-indigo-500 py-3 px-6">
                      <FaFacebook size={36} className="text-white" />
                    </div>
                    <div className="flex flex-col justify-center items-center p-6">
                      <h2 className="text-3xl font-bold mb-2">{job.jobCity}</h2>
                      <div className="flex items-center">
                        <MdOutlineInfo
                          size={24}
                          className="text-indigo-500 mr-2"
                        />
                        <p className="text-lg text-gray-600 font-medium">
                          {job.jobCity}
                        </p>
                      </div>
                      <div className="mt-8 w-full">
                        <h2 className="text-2xl font-bold mb-4">
                          {job.jobCity}
                        </h2>
                        <span className="text-xl text-gray-600 font-medium mb-6">
                          {job.jobPrice}
                        </span>
                        <div className="flex items-center justify-between w-full">
                          <button className="bg-indigo-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition duration-300 ease-in-out">
                            Start Today
                          </button>
                          <div className="flex items-center">
                            <button className="bg-white text-indigo-500 font-bold py-3 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out mr-4">
                              Jep Oferten
                            </button>
                            <button className="bg-white text-indigo-500 font-bold py-3 px-6 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                              <FaHeart size={26} />
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
            <div className="rounded-lg h-full w-full">
              <div className="flex justify-between my-7 mx-6">
                <div className=" h-1/4 w-1/2 mx-9">
                  <div className="mt-10  h-20 flex items-center">
                    <img
                      src={`data:image/jpeg;base64, ${user?.userProfilePicture}`}
                      className="w-44 h-44 mb-8"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className=" font-extralight text-2xl">
                      Posted by Duhet prej databaze:
                      {user?.username}
                    </h3>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-2xl">
                      JobCategory:{selectedJob.jobCategory}
                    </h3>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-4xl">
                      JobTitle:{selectedJob.jobTitle}
                    </h3>
                  </div>
                  <div className="mt-3">
                    <p className=" text-l font-semibold">
                      Job City:{selectedJob.jobCity}
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
                    <div className="mt-3 ml-2">
                      <button className="bg-white text-indigo-500 font-bold py-3 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                        Jep Oferten
                      </button>
                    </div>
                    <div className="mt-3 ml-2">
                      <button className="bg-white text-indigo-500 flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                        <FaHeart size={26} icon="fa-regular fa-heart" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex flex-col mr-10 max-w-2xl max-h-2xl h-80 w-80 bg-gray-500">
                    <img
                      src={images[currentIndex]}
                      class="max-w-auto max-h-auto"
                      alt="User avatar"
                    />
                  </div>
                  <div class="flex justify-center mt-2">
                    <button onClick={nextImage} class="mx-2">
                      Prev
                    </button>
                    <button onClick={prevImage} class="mx-2">
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div class="my-4 border-b border-gray-200 w-full mb-10"></div>
              <div className=" flex justify-between">
                <div className=" w-1/2 pr-4">
                  <h3 className="text-center cursor-pointer">
                    {" "}
                    About this Job{" "}
                  </h3>
                  <div className="flex justify-center">
                    <div className="my-4 text-center border-b-4 cursor-pointer  border-gray-500 hover:border-2 hover:border-indigo-500 w-1/2"></div>
                  </div>
                  <div className="">
                    <h2 className="text-l font-light mt-3">
                      {selectedJob.jobDescription}
                    </h2>
                  </div>
                </div>
                <div className=" w-1/2">
                  <h3 className="text-center">Comments</h3>
                  <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://randomuser.me/api/portraits/women/68.jpg"
                          alt="User avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <h4 className="text-black">Jane Doe</h4>
                      </div>
                      <p className="text-black">So good.</p>
                    </div>
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
                <h3 className="font-bold text-xl">Similar Jobs</h3>
              </div>
              <div id="jobsContainer" className="flex justify-between">
                <div
                  className={`flex justify-between ${jobCategory(
                    selectedJob.jobCategory
                  )}`}
                ></div>
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
                          src={`data:image/jpeg;base64, ${user?.userProfilePicture}`}
                          className="w-44 h-44 mb-8"
                        />
                      </div>
                      <div className="mt-3">
                        <h3 className=" font-extralight text-2xl">
                          Posted by Duhet prej databaze kansa:
                          {filteredJobs[0]?.username}
                        </h3>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-bold text-2xl">
                          JobCategory:{filteredJobs[0].jobCategory}
                        </h3>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-bold text-4xl">
                          JobTitle:{filteredJobs[0].jobTitle}
                        </h3>
                      </div>
                      <div className="mt-3">
                        <p className=" text-l font-semibold">
                          Job City:{filteredJobs[0].jobCity}
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
                          {filteredJobs[0].jobType}
                        </p>
                      </div>
                      <div class="my-4 border-b border-gray-500 w-1/2"></div>
                      <div className="mt-3 flex justify-between w-1/2 text-2xl">
                        <p className=" text-2xl font-bold">Hours </p>
                        <p className=" text-lg font-light">Set own</p>
                      </div>
                      <div className="flex mt-5">
                        <div className="mt-3 ml-2">
                          <button className="bg-white text-indigo-500 font-bold py-3 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                            Jep Oferten
                          </button>
                        </div>
                        <div className="mt-3 ml-2">
                          <button className="bg-white text-indigo-500 flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                            <FaHeart size={26} icon="fa-regular fa-heart" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex flex-col mr-10 max-w-2xl max-h-2xl h-80 w-80 bg-gray-500">
                        <img
                          src={images[currentIndex]}
                          class="max-w-auto max-h-auto"
                          alt="User avatar"
                        />
                      </div>
                      <div class="flex justify-center mt-2">
                        <button onClick={nextImage} class="mx-2">
                          Prev
                        </button>
                        <button onClick={prevImage} class="mx-2">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="my-4 border-b border-gray-200 w-full mb-10"></div>
                  <div className=" flex justify-between">
                    <div className=" w-1/2 pr-4">
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
                    <div className=" w-1/2">
                      <h3 className="text-center">Comments</h3>
                      <div className="flex flex-col gap-4 p-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <img
                              src="https://randomuser.me/api/portraits/women/68.jpg"
                              alt="User avatar"
                              className="w-8 h-8 rounded-full"
                            />
                            <h4 className="text-black">Jane Doe</h4>
                          </div>
                          <p className="text-black">So good.</p>
                        </div>
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
                  {jobs.length > 0 && (
                    <>
                      <div className="flex justify-between my-7 mx-6">
                        <div className=" h-1/4 w-1/2 mx-9">
                          <div className="mt-10  h-20 flex items-center">
                            <img
                              src={`data:image/jpeg;base64, ${user?.userProfilePicture}`}
                              className="w-44 h-44 mb-8"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className=" font-extralight text-2xl">
                              Posted by Duhet prej databaze kansa:
                              {jobs[0]?.username}
                            </h3>
                          </div>
                          <div className="mt-3">
                            <h3 className="font-bold text-2xl">
                              JobCategory:{jobs[0].jobCategory}
                            </h3>
                          </div>
                          <div className="mt-3">
                            <h3 className="font-bold text-4xl">
                              JobTitle:{jobs[0].jobTitle}
                            </h3>
                          </div>
                          <div className="mt-3">
                            <p className=" text-l font-semibold">
                              Job City:{jobs[0].jobCity}
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
                            <div className="mt-3 ml-2">
                              <button className="bg-white text-indigo-500 font-bold py-3 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                                Jep Oferten
                              </button>
                            </div>
                            <div className="mt-3 ml-2">
                              <button className="bg-white text-indigo-500 flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                                <FaHeart size={26} icon="fa-regular fa-heart" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="flex flex-col mr-10 max-w-2xl max-h-2xl h-80 w-80 bg-gray-500">
                            <img
                              src={images[currentIndex]}
                              class="max-w-auto max-h-auto"
                              alt="User avatar"
                            />
                          </div>
                          <div class="flex justify-center mt-2">
                            <button onClick={nextImage} class="mx-2">
                              Prev
                            </button>
                            <button onClick={prevImage} class="mx-2">
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="my-4 border-b border-gray-200 w-full mb-10"></div>
                      <div className=" flex justify-between">
                        <div className=" w-1/2 pr-4">
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
                        <div className=" w-1/2">
                          <h3 className="text-center">Comments</h3>
                          <div className="flex flex-col gap-4 p-4">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <img
                                  src="https://randomuser.me/api/portraits/women/68.jpg"
                                  alt="User avatar"
                                  className="w-8 h-8 rounded-full"
                                />
                                <h4 className="text-black">Jane Doe</h4>
                              </div>
                              <p className="text-black">So good.</p>
                            </div>
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
                                value={jobs[0].jobId}
                              />

                              <textarea
                                placeholder="Leave a comment"
                                className="p-2 rounded-lg"
                                name="commentContent"
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
      </div>
      <Footer />
    </>
  );
}

export default JobSearch;
