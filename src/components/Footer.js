import React from "react";
function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl px-8 md:flex md:items-center md:justify-between">
        <div className="text-gray-500 dark:text-gray-400 flex-grow">
          <h2 className="text-xl font-bold mb-4">Stay Connected</h2>
          <p className="text-sm mb-4">
            Join our newsletter to stay up-to-date on the latest news and trends
            in web design and development.
          </p>
          <form className="flex items-center justify-center">
            <input
              type="email"
              className="py-2 px-4 border border-gray-400 rounded-l-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="bg-gradient-to-br from-gray-700 to-gray-500 text-white py-2 px-4 rounded-r-lg shadow ml-1 hover:shadow-lg hover:from-gray-800 hover:to-gray-600 transition duration-300 ease-in-out"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </form>
        </div>
        <div className="text-gray-500 dark:text-gray-400 mt-8 md:mt-0">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="#" className="hover:text-gray-700 hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700 hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700 hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700 hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            TradeBridge™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
export default Footer;
