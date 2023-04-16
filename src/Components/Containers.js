import React from "react";
import jobFind from "../images/jobFind.jpg";
import jobPersonal from "../images/jobPersonal.jpg";
import jobPaperwork1 from "../images/jobPaperwork1.jpg";
import jobLevel from "../images/jobLevel.jpg";

const Containers = () => {
  return (
    <div>
      <div className=" containers px-20 pt-10">
        <div class="first-line-div flex w-full">
          <div class="flex-grow h-98 px-10 w-1/2 flex flex-col justify-center aspect-w-1 aspect-h-1">
            <h1 class="text-4xl font-bold font-sans md:font-serif mb-4">
              Let the jobs find you
            </h1>
            <p class="mb-4 font-sans md:font-serif">
              Create your free profile to get interview invites and jobs that
              work for you.
            </p>

            <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full ">
              Get hired
            </button>
            </div>
          </div>

          <div class="flex-grow w-1/2 aspect-w-1 aspect-h-1">
            <img class="w-full h-full object-cover" src={jobFind} alt="/" />
          </div>
        </div>

        <div class=" second-line flex w-full ">
          <div class="flex-grow  w-1/2 aspect-w-1 aspect-h-1">
            <img class="w-full h-full object-cover" src={jobPersonal} alt="/" />
          </div>
          <div class="flex-grow h-98 p-4 px-10 w-1/2 flex flex-col justify-center aspect-w-1 aspect-h-1">
            <h1 class="text-4xl font-bold mb-4 font-sans md:font-serif ">
              Your job is personal
            </h1>
            <p class="mb-4 font-sans md:font-serif">
              Tell us more about your goals and we'll match you with the right
              jobs to help you reach them.
            </p>
            <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full">
              See jobs
            </button>
            </div>
          </div>
        </div>

        <div class="third-line flex w-full ">
          <div class="flex-grow h-98 p-4 w-1/2  px-10 flex flex-col justify-center aspect-w-1 aspect-h-1">
            <h1 class="text-4xl font-bold mb-4 font-sans md:font-serif ">
              Skip the paperwork
            </h1>
            <p class="mb-4 font-sans md:font-serif">
              Your profile is your application. Apply to jobs instantly.
            </p>
            <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Create Profile
            </button>
            </div>
          </div>
          <div class="flex-grow w-1/2 aspect-w-1 aspect-h-1">
            <img
              class="w-full h-full object-cover"
              src={jobPaperwork1}
              alt="/"
            />
          </div>
        </div>

        <div class=" fourth-line flex w-full ">
          <div class="flex-grow  w-1/2 aspect-w-1 aspect-h-1">
            <img class="w-full h-full object-cover" src={jobLevel} alt="/" />
          </div>
          <div class="flex-grow h-98 p-4 px-10 w-1/2 flex flex-col justify-center aspect-w-1 aspect-h-1">
            <h1 class="text-4xl font-bold mb-4 font-sans md:font-serif">
              Ready to level-up?
            </h1>
            <p class="mb-4 font-sans md:font-serif">
              Excel with our Jobs Hub. Find tips to get ahead and make your
              goals a reality.
            </p>

            <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Learn more
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Containers;
