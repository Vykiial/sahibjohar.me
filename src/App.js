import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LifeTimeline from "./pages/LifeTimeline";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Projects' element={<Projects />}></Route>
          <Route path='/LifeTimeLine' element={<LifeTimeline />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
