import "./App.css";
import LogInForm from "./Pages/LogInForm";
import SignUpForm from "./Pages/SignUpForm";
import Footer from "./Components/Footer";
import Navbar from "./Components/navbar";
import Home from "./Pages/Home";
import JobSearch from "./Pages/JobSearch";

import PostJobs from "./Pages/PostJobs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
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

      <Footer />
    </>
  )
}

export default App;
