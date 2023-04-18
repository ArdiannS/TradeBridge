import React,{useState} from "react";
import { FaFacebook, FaHeart } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
// import { HiOutlineArrowsExpand  } from 'react-icons/hi';
import { MdOutlineInfo } from "react-icons/md";
import { BsSliders } from "react-icons/bs";
import Footer from "../Components/Footer";

function JobSearch() {


  const divs = [];
  for (let i = 0; i < 5; i++) {
    divs.push(
      <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md  w-4/8 mx-auto my-5">
        <div className="w-full rounded-t-lg bg-indigo-500 py-3 px-6">
          <FaFacebook size={36} className="text-white" />
        </div>
        <div className="flex flex-col justify-center items-center p-6">
          <h2 className="text-3xl font-bold mb-2">Flexible</h2>
          <div className="flex items-center">
            <MdOutlineInfo size={24} className="text-indigo-500 mr-2" />
            <p className="text-lg text-gray-600 font-medium">Per Hour</p>
          </div>
          <div className="mt-8 w-full">
            <h2 className="text-2xl font-bold mb-4">
              DoorDash Dashers - Start Delivering Today
            </h2>
            <span className="text-xl text-gray-600 font-medium mb-6">
              DoorDash
            </span>
            <div className="flex items-center justify-between w-full">
              <button className="bg-indigo-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition duration-300 ease-in-out">
                Start Today
              </button>
              <div className="flex items-center">
                <button className="bg-white text-indigo-500 font-bold py-3 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out mr-4">
                  Apply Now
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
 
  return (
    <>
      <header>{/* <Navbar /> */}</header>
      <div className="flex h-full m-0">
        <div
          className="h-full w-1/3 bg-slate-400"
          style={{ overflowY: "scroll", height: "900px" }}
        >
          <div className="flex flex-col justify-center items-center rounded-lg shadow-md w-full mx-auto">
            <h2 className="font-light text-3xl ml-2 mt-4">Jobs</h2>
            <div className="mt-4 ml-2 flex justify-between gap-4">
              <p className="">3,377,966 jobs</p>
              <div className="flex items-center">
                <p className="pr-4">Filter</p>
                <IoFilterSharp size={22} />
              </div>
              <div className="flex items-center">
                <p className="pr-4">Sort</p>
                <BsSliders size={22} />
              </div>
            </div>
            {/* Content for the left div */}
            {divs};
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
          <div className="rounded-lg h-full w-full">
            <div className=" h-1/4 w-1/2 mx-9 ">
              <div className="mt-10  h-20 flex items-center">
                <FaFacebook size={60} className="text-blue-800 ml-3" />
              </div>
              <div className="mt-3">
                <h3 className=" font-extralight text-2xl">DoorDash</h3>
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-4xl">
                  DoorDash Dashers - Start Delivering Today
                </h3>
              </div>
              <div className="mt-3">
                <p className=" text-l font-semibold">Address: Istog</p>
              </div>
              <div className="mt-3 ml-2">
                <button className=" bg-white text-sm border border-black font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                  Start Today
                </button>
              </div>
              <div className="mt-3 flex justify-between w-1/2 text-2xl">
                <p className=" text-2xl font-bold">Pay </p>
                <p className=" text-lg font-light">Flexible</p>
              </div>
              <div class="my-4 border-b border-gray-500 w-1/2"></div>
              <div className="mt-3 flex justify-between w-1/2 text-2xl">
                <p className="text-2xl font-bold">Distance </p>
                <p className=" text-lg font-light">Work anywhere</p>
              </div>
              <div class="my-4 border-b border-gray-500 w-1/2"></div>
              <div className="mt-3 flex justify-between w-1/2 text-2xl">
                <p className=" text-2xl font-bold">Hours </p>
                <p className=" text-lg font-light">Set own</p>
              </div>
              <div className="flex mt-5">
                <div className="mt-3 ml-2">
                  <button className="bg-white text-indigo-500 font-bold py-3 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                    Apply Now
                  </button>
                </div>
                <div className="mt-3 ml-2">
                  <button className="bg-white text-indigo-500 flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                    <FaHeart size={26} icon="fa-regular fa-heart" />
                  </button>
                </div>
              </div>
            </div>
            <div class="my-4 border-b border-gray-200 w-full mt-56"></div>
            <div className=" flex justify-between">
              <div className=" w-1/2 pr-4">
                <h3 className="text-center cursor-pointer"> About this Job </h3>
                <div className="flex justify-center">
                  <div className="my-4 text-center border-b-4 cursor-pointer  border-gray-500 hover:border-2 hover:border-indigo-500 w-1/2"></div>
                </div>
                <div className="">
                  <h2 className="text-l font-bold">Your time. Your Goals.</h2>
                  <h2 className="text-l font-light mt-3">
                    Your time. Your Goals.
                  </h2>
                  <h2 className="text-l font-light mt-3">
                    Available in over 4,000 cities in the U.S, DoorDash connects
                    local businesses and local drivers (called Dashers) with
                    opportunities to earn, work, and live.
                  </h2>
                  <h2 className="text-l font-light mt-3">
                    <strong>As a Dasher</strong>, you can be your own boss and
                    enjoy the flexibility of choosing when, where, and how much
                    you earn. All you need is a mode of transportation (bike,
                    car, scooter) and a smartphone to start making money. It’s
                    that simple. You can even sign up and begin working that
                    same day. With Dasher Direct, you can also get paid the same
                    day!
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
                  <form className="flex flex-col gap-2">
                    <textarea
                      placeholder="Leave a comment"
                      className="p-2 rounded-lg"
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
            <div className="flex justify-between">
              <div className="h-full rounded-lg w-1/3 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3">
                <div className="rounded-lg  mt-5">
                  <div className="mt-5 flex justify-between items-center">
                    <div className="">
                      <FaFacebook size={43} className="ml-4 mt-4" />
                    </div>
                    <div className="ml-auto">
                      <h2 className="ml-4 mt-4 mr-4 text-3xl font-mono">
                        Flexible
                      </h2>
                      <div className="flex">
                        <MdOutlineInfo className="ml-4 mt-4 text-blue-500" />
                        <p className="pt-2 px-1">per hour</p>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-7">
                    <h2 className="font-bold text-2xl ml-2">
                      DoorDash Dashers - Start Delivering Today
                    </h2>
                    <span className="font-light text-xl ml-2"> DoorDash</span>
                    <div className="mt-3 ml-2">
                      <button className="bg-white border border-black font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                        Start Today
                      </button>
                    </div>
                    <div className="flex mt-5 bg-slate-600 justify-center">
                      <div className="mt-3 w-full-10 ">
                        <button className="bg-indigo-500 text-white flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300 ease-in-out">
                          <p>Apply </p>
                        </button>
                      </div>
                      <div className="mt-3 ml-2">
                        <button className="bg-indigo-500 text-white flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300 ease-in-out">
                          <FaHeart size={26} icon="fa-regular fa-heart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-full rounded-lg w-1/3 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3">
                <div className="rounded-lg  mt-5">
                  <div className="mt-5 flex justify-between items-center">
                    <div className="">
                      <FaFacebook size={43} className="ml-4 mt-4" />
                    </div>
                    <div className="ml-auto">
                      <h2 className="ml-4 mt-4 mr-4 text-3xl font-mono">
                        Flexible
                      </h2>
                      <div className="flex">
                        <MdOutlineInfo className="ml-4 mt-4 text-blue-500" />
                        <p className="pt-2 px-1">per hour</p>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-7">
                    <h2 className="font-bold text-2xl ml-2">
                      DoorDash Dashers - Start Delivering Today
                    </h2>
                    <span className="font-light text-xl ml-2"> DoorDash</span>
                    <div className="mt-3 ml-2">
                      <button className="bg-white border border-black font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                        Start Today
                      </button>
                    </div>
                    <div className="flex mt-5 bg-slate-600 justify-center">
                      <div className="mt-3 w-full-10 ">
                        <button className="bg-indigo-500 text-white flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300 ease-in-out">
                          <p>Apply </p>
                        </button>
                      </div>
                      <div className="mt-3 ml-2">
                        <button className="bg-indigo-500 text-white flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300 ease-in-out">
                          <FaHeart size={26} icon="fa-regular fa-heart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full rounded-lg w-1/3 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3">
                <div className="rounded-lg  mt-5">
                  <div className="mt-5 flex justify-between items-center">
                    <div className="">
                      <FaFacebook size={43} className="ml-4 mt-4" />
                    </div>
                    <div className="ml-auto">
                      <h2 className="ml-4 mt-4 mr-4 text-3xl font-mono">
                        Flexible
                      </h2>
                      <div className="flex">
                        <MdOutlineInfo className="ml-4 mt-4 text-blue-500" />
                        <p className="pt-2 px-1">per hour</p>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-7">
                    <h2 className="font-bold text-2xl ml-2">
                      DoorDash Dashers - Start Delivering Today
                    </h2>
                    <span className="font-light text-xl ml-2"> DoorDash</span>
                    <div className="mt-3 ml-2">
                      <button className="bg-white border border-black font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                        Start Today
                      </button>
                    </div>
                    <div className="flex mt-5 bg-slate-600 justify-center">
                      <div className="mt-3 w-full-10 ">
                        <button className="bg-indigo-500 text-white flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300 ease-in-out">
                          <p>Apply </p>
                        </button>
                      </div>
                      <div className="mt-3 ml-2">
                        <button className="bg-indigo-500 text-white flex justify-center font-bold mb-2 py-3 w-40 px-8 border border-indigo-500 rounded-full hover:bg-white hover:text-indigo-500 transition duration-300 ease-in-out">
                          <FaHeart size={26} icon="fa-regular fa-heart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobSearch;
