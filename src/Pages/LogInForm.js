import React from "react";
import loginImg from "../images/login.jpg";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SignUpForm } from "./SignUpForm";

function LogInForm() {
  return (
    <div className="my-0 grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md"
          method="POST" action="/signin"
        >
          <h2 className="text-4xl font-bold text-center py-6">Log In</h2>

          <div className="flex flex-col mb-4">
            <label className="font-semibold mb-1">Username</label>
            <input
              type="text"name="username"
              className="border p-2 rounded-lg"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold mb-1">Password</label>
            <input name="password"
              type="password"
              className="border p-2 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          <button className="border rounded-lg w-full my-5 py-2 bg-indigo-600 hover:bg-green-800 text-white font-semibold">
            Sign in
          </button>

          <h4 className="text-center mb-3">Or sign in with:</h4>

          <div className="flex justify-center items-center mb-4 ">
            <div className="flex gap-4 cursor-pointer">
              <FaFacebook
                size={36}
                className="text-blue-700 hover:text-blue-900"
              />
              <FaGoogle size={36} className="text-red-700 hover:text-red-900" />
              <FaTwitter
                size={36}
                className="text-blue-500 hover:text-blue-700"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Remember me</span>
            </label>
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Create an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogInForm;
