import React from "react";
function Stats() {
  return (
    <div class=" py-24 sm:py-32 w-full ">
      <div class="  ">
        <div class="mx-auto max-w-7xl  ">
          <div class="grid grid-cols-1 gap-8 sm:gap-16 lg:grid-cols-3">
            <div class="bg-gray-50 shadow-md rounded-lg overflow-hidden">
              <div class="px-6 py-8">
                <div class="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79z"
                    />
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-700 mb-2">
                  Total users:
                </h2>
                <p class="text-3xl font-bold text-gray-900">44 million</p>
              </div>
            </div>
            <div class="bg-gray-50 shadow-md rounded-lg overflow-hidden">
              <div class="px-6 py-8">
                <div class="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-white mb-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-700 mb-2">
                  Total Jobs:
                </h2>
                <p class="text-3xl font-bold text-gray-900">$119 trillion</p>
              </div>
            </div>
            <div class="bg-gray-50 shadow-md rounded-lg overflow-hidden">
              <div class="px-6 py-8">
                <div class="flex items-center justify-center w-12 h-12 rounded-md bg-red-500 text-white mb-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-700 mb-2">
                  New users annually
                </h2>
                <p class="text-3xl font-bold text-gray-900">46,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
