import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Discover from "./components/Discover";
import Casting from "./components/Casting";
import Home from "./components/Home";
import "./styles/NavBar.css";
import Auth from "./components/Auth";
import axios from "axios";

const App = () => {
  // store use data and auth token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  const logout = () => {
    axios
      .post("https://bookcast-server.herokuapp.com/api/auth/logout", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setToken("");
        setUser(null);
        setError(false);
        navigate("/");
      })
      .catch((err) => setError(err));
  };

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
        {!user && (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
        {user && (
          <button className="link" onClick={logout}>
            Logout
          </button>
        )}
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
