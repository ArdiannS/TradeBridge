import React from "react";
import { FaFacebook, FaHeart } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
// import { HiOutlineArrowsExpand  } from 'react-icons/hi';
import { MdOutlineInfo } from "react-icons/md";
import { BsSliders } from "react-icons/bs";

function JobSearch() {
  return (
    <>
      <div className="flex">
        <div class="w-1/4 h-full bg-slate-300 overflow-scroll">
          <h2 className="font-light text-3xl ml-2 mt-4">Jobs</h2>
          <div className="mt-4 ml-2 flex justify-between">
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
          <div className="h-full rounded-lg w-4/8 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3">
            <h3 className="text-white">I'm on the left</h3>
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
            </div>
          </div>
          <div className="h-full rounded-lg w-4/8 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3">
            <h3 className="text-white">I'm on the left</h3>
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
            </div>
          </div>
          <div className="h-full rounded-lg w-4/8 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3">
            <h3 className="text-white">I'm on the left</h3>
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
            </div>
          </div>
          <div className="h-full rounded-lg w-4/8 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3">
            <h3 className="text-white">I'm on the left</h3>
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
            </div>
          </div>
          <div className="h-full rounded-lg w-4/8 ml-2 mt-10 my-5 bg-white border-2 cursor-pointer hover:border-indigo-500 mr-3">
            <h3 className="text-white">I'm on the left</h3>
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
            </div>
          </div>
        </div>

        {/* Adjust the flex properties of this div */}
        <div className="w-3/4 bg-red-700 flex justify-center">
          {/* Content for the right div */}
          <div className="rounded-lg h-full bg-black w-full">
            <h3 className="text-white">I'm on the right</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobSearch;
