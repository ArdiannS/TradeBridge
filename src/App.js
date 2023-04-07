import './App.css';
import LogInForm from './Pages/LogInForm';
import SignUpForm from './Pages/SignUpForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return <>
  <Router>
    <Routes>
        <Route path="/signin" element={<LogInForm />} />
        <Route exact path="/signup" element={<SignUpForm />} />
      </Routes>
    </Router>
    </>
  
}

export default App;
