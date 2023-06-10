import React, {useState} from "react";
import loginImg from "../images/particle-lines-futuristic-network-background.jpg";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { SignUpForm } from "./SignUpForm";
import axios from "../api/axiosInstance";
import { useNavigate } from 'react-router-dom';

function LogInForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({username: "", password: ""});
  const [error, setError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/signin', formData)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data.userData?.[0]) || "");
          navigate('/dashboard');
        }).catch(({response}) => {
          setError(response.data.message)
        });
  }

  return (
      <div className="w-full">
        <div className="hidden sm:block bg-gradient-to-r from-blue-600 to-blue-400">
          <img className="w-screen h-screen object-cover " src={loginImg} alt="" />
        <div className="bg-gray-100 flex flex-col justify-center items-center w-full z-50">
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 w-1/3 opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Mirësevini në TradeBridge</h2>
            <p className="text-xl text-gray-700 mb-6">Lidhuni me tregjet globale dhe kapni mundësi të reja.</p>
            <p className="text-lg text-gray-700 leading-relaxed">
              TradeBridge është një platformë e avancuar që ju jep aftësinë të zgjeroni gjirin e biznesit tuaj, të gjeni partnerë të rinj dhe të shfrytëzoni potencialin e tregtisë ndërkombëtare. Me mjete dhe rrjetin tonë të avancuar, ju mund të mbushni boshllëqet midis tregjeve dhe të ndërtoni suksesin e biznesit tuaj.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Bashkohuni me TradeBridge sot dhe zbuloni një botë të mundësive. Filloni eksplorimin e tregjeve të reja, lidhuni me blerës ose furnizues potencialë dhe shtoni rritjen e biznesit tuaj. Menaxhoni transaksionet tuaja tregtare në mënyrë të lehtë, aksesoni të dhëna të vlefshme dhe qëndroni para konkurrencës.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Përjetoni fuqinë e TradeBridge dhe çoni biznesin tuaj në nivelin tjetër. Regjistrohuni tani dhe filloni një udhëtim drejt suksesit të tregtisë globale.
            </p>
          </div>




          <form className="max-w-md w-full mx-auto bg-white opacity-80 p-6 rounded-lg shadow-lg absolute top-1/3 right-96">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Log In</h2>

            {error && (
                <p className="text-red-500 font-semibold mb-4">{error}</p>
            )}

            <div className="mb-4">
              <label className="font-semibold text-gray-800">Username</label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                    onInput={(event) =>
                        setFormData({ ...formData, username: event.target.value })
                    }
                    value={formData.username}
                    type="text"
                    name="username"
                    className="flex-grow bg-transparent focus:outline-none"
                    placeholder="Enter your username"
                />
                <FontAwesomeIcon icon={faUser} size="lg" className="text-gray-400 mx-2" />
              </div>
            </div>
            <div className="mb-4">
              <label className="font-semibold text-gray-800">Password</label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                    name="password"
                    onInput={(event) =>
                        setFormData({ ...formData, password: event.target.value })
                    }
                    value={formData.password}
                    type="password"
                    className="flex-grow bg-transparent focus:outline-none"
                    placeholder="Enter your password"
                />
                <FontAwesomeIcon icon={faLock} size="lg" className="text-gray-400 mx-2" />
              </div>
            </div>

            <button
                onClick={handleLogin}
                className="border rounded-lg w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors duration-300 shadow-lg"
            >
              Sign in
            </button>

            <h4 className="text-center my-4">Or sign in with:</h4>

            <div className="flex justify-center items-center mb-4">
              <div className="flex gap-4 cursor-pointer">
                <FaFacebook
                    size={36}
                    className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
                />
                <FaGoogle
                    size={36}
                    className="text-red-700 hover:text-red-900 transition-colors duration-300"
                />
                <FaTwitter
                    size={36}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-800">
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
      </div>



  );
}

export default LogInForm;
