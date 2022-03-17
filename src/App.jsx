import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Discover from "./components/Discover";
import RecentList from "./components/RecentList";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Home from "./components/Home";
import "./styles/NavBar.css";
import Auth from "./components/Auth";

const App = () => {
  return (
    <>
      <div className="navbar">
        <img src="../images/bookcastlogo.png" />
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/discover">
          Discover
        </Link>
        <Link className="link" to="/recent-list">
          Recent List
        </Link>
        <Link className="link" to="/profile">
          Profile
        </Link>
        <Link className="link" to="/login">
          Login
        </Link>
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/recent-list" element={<RecentList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
