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
import EditJobs from "./Pages/EditJobs";
import Dashboard from "./Pages/Dashboard";
import EditUser from "./Pages/EditUser";
import PrivateRoute from "./utils/ProtectedRoute";
import EditComment from "./Pages/EditComment";
import EditMyInfo from "./Pages/EditUserProfile";
function App() {
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
      {isLoading ? (
        <PreLoader />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
          
            <Route path="/signup"   element={
                <PrivateRoute>
                  <SignUpForm />
                </PrivateRoute>
              } />
            <Route
              path="/dashboard"
              exact
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
              <Route path="/signin"exact element={<PrivateRoute>
                  <LogInForm />
                </PrivateRoute>} />
            <Route path="/postjobs" exact element={<PostJobs />} />
            <Route path="/jobsearch" exact element={<JobSearch />} />
            <Route path="/edituser/:id" exact element={<EditUser />} />
            <Route path="/editjobs/:id" exact element={<EditJobs />} />
            <Route path="/editComment/:id" exact element={<EditComment />} />
            <Route path="/user/profile" exact element={<EditMyInfo />} />
          </Routes>
        </Router>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
