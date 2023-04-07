import './App.css';
import LogInForm from './Components/LogInForm';
import SignUpForm from './Components/SignUpForm';
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';


function App() {
  return <>

      <Router>
      <Navbar/>
      <img src="https://picsum.photos/id/237/1920/1080" />
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
}

export default App;
