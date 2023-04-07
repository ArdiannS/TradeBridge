import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <img src="https://picsum.photos/id/237/1920/1080" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
