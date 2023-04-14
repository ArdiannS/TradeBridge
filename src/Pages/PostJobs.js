import React from "react";
import mainIMG from "../images/photo.jpg";
function PostJobs() {
  return (
    <div>
      <div class="flex flex-col md:flex-row justify-center items-center my-56 items-start">
        <div class="w-full md:w-1/2 px-4 relative">
          <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h2 class="text-white text-2xl font-bold uppercase tracking-wide">
              Find the job you always dreamed of
            </h2>
          </div>
          <img
            src={mainIMG}
            alt="your-image-alt-text"
            class="w-full h-auto rounded-full"
          />
        </div>
        <form action="" method="post" class="w-full md:w-1/2 px-4">
          <h1 class="text-3xl font-bold mb-4 text-center text-gray-800">
            Post a New Job
          </h1>
          <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out px-10 py-8 my-4 transform hover:-translate-y-1">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="job-title"
              >
                Title
              </label>
              <input
                class=" focus:border-blue-600 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="job-title"
                name="job-title"
                placeholder="Frontend Developer"
                autofocus
              />
            </div>

            <div class="mb-4">
              <label
                class=" block text-gray-700 text-sm font-bold mb-2"
                for="apply-link"
              >
                Link to apply
              </label>
              <input
                class="focus:border-blue-600 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="apply-link"
                name="apply-link"
                placeholder="https://www.djangoproject.com/apply"
              />
            </div>

            <div class="md:flex md:justify-between">
              <div class="w-full md:w-3/12 mb-4 md:mb-0">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="job-type"
                >
                  Job Type
                </label>
                <div class="relative">
                  <select
                    class="focus:border-blue-600 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="job-type"
                    name="job-type"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Freelance</option>
                    <option>Contract</option>
                  </select>

                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="w-full md:w-8/12 mb-4 md:mb-0">
                <label
                  for="location"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  class="focus:border-blue-600 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  name="location"
                  placeholder="Schwerin"
                />

                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      id="remote"
                    />
                    <span class="text-sm">Work can be done remotely</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label
                for="description"
                class="focus:border-blue-600 block text-gray-700 text-sm mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                cols="50"
                rows="5"
                class=" resize-none border border-gray-400"
              ></textarea>
            </div>

            <div class="flex flex-wrap -mx-3">
              <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label for="company" class="block text-gray-700 text-sm mb-2">
                  Company
                </label>
                <input
                  type="text"
                  class="focus:border-blue-600 appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                  id="company"
                  name="company"
                  placeholder="Company"
                />
              </div>

              <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label for="company" class=" block text-gray-700 text-sm mb-2">
                  Company Website
                </label>
                <input
                  type="text"
                  class="focus:border-blue-600 appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                  id="company"
                  name="company"
                  placeholder="https://www.djangoproject.com/"
                />
              </div>
            </div>

            <div class="mb-4 md:mb-0">
              <label
                for="company-logo"
                class="block text-gray-700 text-sm mb-2"
              >
                Logo Image
              </label>
              <input
                type="file"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="company-logo"
                name="company-logo/"
              />
            </div>
          </div>

          <div>
            <button
              class="bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 rounded"
              type="submit"
            >
              Create job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJobs;
