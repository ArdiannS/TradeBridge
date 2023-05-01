import "./App.css";
import LogInForm from "./Pages/LogInForm";
import SignUpForm from "./Pages/SignUpForm";
import Footer from "./Components/Footer";
import Navbar from "./Components/navbar";
import Home from "./Pages/Home";
import JobSearch from "./Pages/JobSearch";
import PostJobs from "./Pages/PostJobs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreLoader from "./Pages/PreLoader";
import React, { useState, useEffect } from "react";
function App() {
  const[backendData,setBackEndData] = useState([{}]);
  useEffect(()=>{
    fetch("/api").then(
    response => response.json()
    ).then(
      data=>{
        setBackEndData(data)
      }
    )
},[])
const[userdata,setUserData] = useState([]);
useEffect(()=>{
  fetch("/api/users").then(
    response => response.json()
    ).then(
      data=>{
        setBackEndData(data)
      }
    )
},[])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1);
  }, []);

  return (
    <>
    {/* {(typeof backendData.users === 'undefined') ? (
      <p>Loading...</p>
    ) : (
      backendData.users.map((user,i) => (
        <p key={i}>{user}</p>
      ))
    )}
    {userdata.map((item)=>(
      {item}
    ))} */}
      {isLoading ? <PreLoader /> :(
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" exact element={<LogInForm />} />
          <Route path="/signup" exact element={<SignUpForm />} />
          <Route path="/postjobs" exact element={<PostJobs />} />
          <Route path="/jobsearch" exact element={<JobSearch />} />
        </Routes>
      </Router>
      ) }
      {/* <Footer /> */}
    </>
  );
}

export default App;
