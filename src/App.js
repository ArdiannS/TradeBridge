import './App.css';
import LogInForm from './Components/LogInForm';
import SignUpForm from './Components/SignUpForm';
import Footer from "./Components/Footer";
import Navbar from "./Components/navbar";
import Home from "./Components/Home";
import Support from "./Components/Support";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <header>
          <Navbar />
        </header>
        <div>
          <Home />
          <Support />
        </div>
        <Routes>
        <Route exact path="/" element={< Home/>} />
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
