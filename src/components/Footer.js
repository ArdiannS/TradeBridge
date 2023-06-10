import React from "react";
import MakeRequest from "../Pages/MakeRequest";
function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl px-8 md:flex md:items-center md:justify-between">
        <div className="text-gray-500 dark:text-gray-400 flex-grow">
          <h2 className="text-xl font-bold mb-4">Stay Connected</h2>
          <p className="text-sm mb-4">
            We would love to hear from you! If you have any questions, feedback,
            or simply want to say hello, please don't hesitate to get in touch.
            Our team is here to assist you.
          </p>
          <MakeRequest />
        </div>
        <div className="text-gray-500 dark:text-gray-400 mt-8 md:mt-0"></div>
      </div>
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="#" className="hover:underline">
            TradeBridge™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
