import React, { useState } from "react";
import loginImg from "../images/particle-lines-futuristic-network-background.jpg";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { RiMailLine } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer.js";
import axios from "../api/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

function SignUpForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorInput, setErrorInput] = useState(false);

  //  const handleSignUp = (e) => {
  //     e.preventDefault();
  //     axios
  //       .post("/signup", formData)
  //       .then((res) => {
  //         localStorage.setItem(
  //           "user",
  //           JSON.stringify(res.data.userData?.[0]) || ""
  //         );

  //         navigate("/dashboard");
  //       })
  //       .catch(({ response }) => {
  //         // TODO: set error
  //       });
  //    };
  const handleSignUp = (e) => {
    e.preventDefault(); // Move this line to the beginning of the function

    const newErrors = {};
    let hasError = false; // Use a separate flag variable to track errors

    if (!formData.username) {
      newErrors.username = "Username is required";
      hasError = true;
    } else if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (!/^.{7,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 7 characters long";
      hasError = true;
    } else if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
      hasError = true;
    } else if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address";
      hasError = true;
    } else if (!formData.date) {
      newErrors.date = "Date of birth is required";
      hasError = true;
    } else if (
      !/^(\d{2}\/\d{2}\/\d{4})|(?:\d{4}-\d{2}-\d{2})$/.test(formData.date)
    ) {
      newErrors.date = "Invalid date format. Use MM/DD/YYYY or YYYY-MM-DD";
      hasError = true;
    } else if (!formData.userType) {
      newErrors.userType = "User type is required";
      hasError = true;
    }

    if (hasError) {
      // Check the flag variable instead of errorInput
      setErrors(newErrors);
      return;
    }

    axios
      .post("/signup", formData)
      .then((res) => {
        console.log(" resssssss signup", res)
        localStorage.setItem("user", JSON.stringify(res.data.result) || "");
        navigate("/dashboard");
      })
      .catch(({ response }) => {
        // Handle error
        // setError(response.data.message);
      });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    date: "",
    userType: "",
  });

  return (
    <div className="hidden sm:block bg-gradient-to-r from-blue-600 to-blue-400">
      <img className="w-screen h-screen object-cover" src={loginImg} alt="" />

      <div className="bg-gray-100 flex flex-col justify-center items-center w-full z-50">
        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 w-1/3 opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Mirësevini në TradeBridge
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Lidhuni me tregjet globale dhe kapni mundësi të reja.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            TradeBridge është një platformë e avancuar që ju jep aftësinë të
            zgjeroni gjirin e biznesit tuaj, të gjeni partnerë të rinj dhe të
            shfrytëzoni potencialin e tregtisë ndërkombëtare. Me mjete dhe
            rrjetin tonë të avancuar, ju mund të mbushni boshllëqet midis
            tregjeve dhe të ndërtoni suksesin e biznesit tuaj.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Bashkohuni me TradeBridge sot dhe zbuloni një botë të mundësive.
            Filloni eksplorimin e tregjeve të reja, lidhuni me blerës ose
            furnizues potencialë dhe shtoni rritjen e biznesit tuaj. Menaxhoni
            transaksionet tuaja tregtare në mënyrë të lehtë, aksesoni të dhëna
            të vlefshme dhe qëndroni para konkurrencës.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Përjetoni fuqinë e TradeBridge dhe çoni biznesin tuaj në nivelin
            tjetër. Regjistrohuni tani dhe filloni një udhëtim drejt suksesit të
            tregtisë globale.
          </p>
        </div>

        <form className="max-w-md w-full mx-auto bg-white opacity-80 p-6 rounded-lg shadow-lg absolute top-1/4 right-96">
          <h2 className="text-4xl font-bold text-center py-6">Sign Up</h2>

          <div className="flex flex-col mb-4">
            <label className="font-semibold mb-1">Username</label>
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <input
                type="text"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onInput={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                className="text-gray-400 mx-2"
              />
            </div>
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col mb-4">
              <label className="font-semibold mb-1">Password</label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="password"
                  className="flex-grow bg-transparent focus:outline-none"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onInput={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <FontAwesomeIcon
                  icon={faLock}
                  size="lg"
                  className="text-gray-400 mx-2"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold mb-1">
                Confirm your Password
              </label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  type="password"
                  className="flex-grow bg-transparent focus:outline-none"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.confirmPassword}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <FontAwesomeIcon
                  icon={faLock}
                  size="lg"
                  className="text-gray-400 mx-"
                />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold mb-1">Email</label>
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <input
                type="email"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onInput={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <RiMailLine size={25} className="" />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold mb-1">Date of birth</label>
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <input
                type="date"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Enter your password"
                name="date"
                value={formData.date}
                onInput={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            {errors.date && <p className="text-red-500">{errors.date}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex items-center justify-center mb-4">
              <h4 className="font-bold text-center flex-1 text-lg">
                Dua te regjistrohem si:
              </h4>
            </div>
            <div className="flex justify-betweenw-1/2 ml-20">
              <label className="mr-4 ">
                <input
                  type="radio"
                  className="border p-2 rounded-lg"
                  name="userType"
                  value="punedhenes"
                  onInput={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                />
                <span className="pl-2 font-bold text-lg">Punedhenes</span>
              </label>
              <label>
                <input
                  type="radio"
                  className="border p-2 rounded-lg"
                  name="userType"
                  value="punemarres"
                  onInput={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                />
                <span className="pl-2 font-bold text-lg">Punemarres</span>
              </label>
            </div>
            {errors.userType && (
              <p className="text-red-500">{errors.userType}</p>
            )}
          </div>

          <button
            onClick={handleSignUp}
            className="border rounded-lg w-full my-5 py-2 bg-indigo-600 hover:bg-green-800 text-white font-semibold"
          >
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
