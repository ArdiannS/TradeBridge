import React from "react";
import loginImg from "../images/login.jpg";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUpForm() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full ">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center ">
        <form
          className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md"
          method="POST"
          action="/signup"
        >
          <h2 className="text-4xl font-bold text-center py-6">Sign Up</h2>

          <div className="flex flex-col mb-4">
            <label className="font-semibold mb-1">Username</label>
            <input
              type="text"
              className="border p-2 rounded-lg"
              placeholder="Enter your username"
              name = "username"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col mb-4">
              <label className="font-semibold mb-1">Password</label>
              <input
                type="password"
                className="border p-2 rounded-lg"
                placeholder="Enter your password"
                name = "password"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold mb-1">
                Confirm your Password
              </label>
              <input
                type="password"
                className="border p-2 rounded-lg"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold mb-1">Email</label>
            <input
              type="email"
              className="border p-2 rounded-lg"
              placeholder="Enter your Email"
              name = "email"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold mb-1">Date of birth</label>
            <input
              type="date"
              className="border p-2 rounded-lg"
              placeholder="Enter your password"
              name = "date"

            />
          </div>
          <div className="flex flex-col mb-4">
  <div className="flex items-center justify-center mb-4">
    <h4 className="font-bold text-center flex-1 text-lg">Dua te regjistrohem si:</h4>
  </div>
  <div className="flex justify-betweenw-1/2 ml-20">
    <label className="mr-4 ">
      <input
        type="radio"
        className="border p-2 rounded-lg"
        name="userType"
        value="punedhenes"
      />
  <span className="pl-2 font-bold text-lg">Punedhenes</span> 
    </label>
    <label>
      <input
        type="radio"
        className="border p-2 rounded-lg"
        name="userType"
        value="punemarres"
      />
  <span className="pl-2 font-bold text-lg">Punemarres</span> 
    </label>
  </div>
</div>

          <button className="border rounded-lg w-full my-5 py-2 bg-indigo-600 hover:bg-green-800 text-white font-semibold">
            Sign up
          </button>

          <h4 className="text-center mb-3">Or sign up with:</h4>

          <div className="flex justify-center items-center mb-4">
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
              to="/signin"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
