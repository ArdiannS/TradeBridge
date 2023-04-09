import "./App.css";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
        </div>

        <Routes>
          {/* <Route exact path="/" element={< Home/>} /> */}
          <Route path="/signin" element={<LogInForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
