import React from "react";
//import bgImg from "../images/bgImg.jpeg";
import mainIMG from "../images/mainIMG.jpg";
import Support from "../Components/Support";
import Containers from "../Components/Containers";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { BriefcaseIcon, DocumentTextIcon } from "@heroicons/react/solid";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const isLoggedIn = user && Object.keys(user).length > 0
  console.log(isLoggedIn);

  return (
    <>
      <div className="w-full h-screen bg-zinc-200 flex flex-col justify-between ">
        <div className="relative w-full h-full">
          <img
            className="absolute top-0 left-0 w-full h-full"
            src={mainIMG}
            alt="/"
          />
          <div className="absolute inset-0 bg-white bg-opacity-10 z-10 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Trade Bridge
            </h1>
            <p className="text-2xl text-white">Find your Solution</p>
            <div className="flex justify-center md:justify-start mt-6">
              <button className="bg-indigo-500 text-white font-bold py-3 px-8 mr-4 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out">
                Get Started
              </button>
              <button className="bg-white text-indigo-500 font-bold py-3 px-8 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[5%] md:min-w-[760px] mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-white border border-slate-300 rounded-xl text-center shadow-xl z-10">
          <p className="text-indigo-900 font-bold py-6 border-b border-slate-300">
            Application Services
          </p>
          <div className="flex justify-center flex-wrap px-8 py-6 ">
            <div className="flex items-center mb-4 mx-4 hover:text-indigo-600">
              <BriefcaseIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <Link to="/jobsearch">
                <p className="text-slate-700 font-medium hover:text-indigo-600 cursor pointer">
                  Job Search
                </p>
              </Link>
            </div>
            {isLoggedIn && user.usertype === "punemarres" ? (
                <>
                  {/* Code specific to "punemarres" user */}
                </>
            ) : (
                <>
                  <div className="flex items-center mb-4 ml-4 hover:text-indigo-600">
                    <DocumentTextIcon className="h-6 w-6  text-indigo-600 mr-2" />
                    <Link to="/postjobs">
                      <p className="text-slate-700 font-medium hover:text-indigo-600 cursor pointer">
                        Post a Job
                      </p>
                    </Link>
                  </div>                </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Containers />
      </div>
      <div>
        <Support />
      </div>
      <Footer/>
    </> 
  );
};

export default Home;
