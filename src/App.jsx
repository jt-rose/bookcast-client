import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Discover from "./components/Discover";
import Casting from "./components/Casting";
import "./styles/NavBar.css";
import Auth from "./components/Auth";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <div className="navbar">
       <Link className="link" to = '/'> <img className="logo" src="../images/bookcastlogo.png" /> </Link>
        <Link className="link" to="/casting">
          Casting
        </Link>
        <Link className="link" to="/discover">
          Discover
        </Link>
        <Link className="link" to="/login">
          Login
        </Link>
      </div>
      {/* castings, Discover   login */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/casting" element={<Casting />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
