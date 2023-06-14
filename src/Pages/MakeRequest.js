import React from "react";

function MakeRequest() {
  return (
    <div>
      <form
        className="flex flex-col items-center justify-center m"
        action="/request"
        method="POST"
      >
        <input
          type="email"
          className="py-2 px-4 border border-gray-400 rounded-l-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          placeholder="Enter your email address"
          name="email"
        />
        <textarea
          className="py-2 px-4 border border-gray-400 rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none h-20 mb-2"
          placeholder="Enter your request"
          name="request"
        ></textarea>
        <button
          type="submit"
          className="bg-gradient-to-br from-gray-700 to-gray-500 text-white py-2 px-6 rounded-lg flex items-center justify-center shadow ml-1 hover:shadow-lg hover:from-gray-800 hover:to-gray-600 transition duration-300 ease-in-out"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <span className="pr-5">Submit</span>
        </button>
      </form>
    </div>
  );
}

export default MakeRequest;
