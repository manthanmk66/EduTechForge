import "./App.css";

import Login from "./sections/login";
import Signup from "./sections/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./sections/home";
import Rating from "./sections/rating";
import Navbar from "./common/navabar";
import About from "./sections/About";
import MyProfile from "./common/core/dashboard/Myprofile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/about" element={<About />} />

        <Route path="dashboard/my-profile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
