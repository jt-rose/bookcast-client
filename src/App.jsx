import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Discover from "./components/Discover";
import Casting from "./components/Casting";
import Home from "./components/Home";
import "./styles/NavBar.css";
import Auth from "./components/Auth";

const App = () => {
  // store use data and auth token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  return (
    <>
      <div className="navbar">
        <Link className="link" to="/">
          {" "}
          <img className="logo" src="../images/bookcastlogo.png" />{" "}
        </Link>
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
        <Route
          path="/login"
          element={
            <Auth
              userData={{ user, setUser }}
              tokenData={{ token, setToken }}
              errorData={{ error, setError }}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
