import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Discover from "./components/Discover";
import Casting from "./components/Casting";
import Home from "./components/Home";
// import "./styles/NavBar.css";
// import "./styles/footer.css";
import "./styles/jihee.css";

import Register from "./components/Register";
import Login from "./components/Login";
import Cast from "./components/Cast";
import axios from "axios";

const App = () => {
  // store use data and auth token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  const getUser = () => {
    axios
      .get("https://bookcast-server.herokuapp.com/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setError(false);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    console.log(storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("token", token);
    getUser();
  }, [token]);

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
        {user && (
          <Link className="link" to="/casting">
            Casting
          </Link>
        )}

        <Link className="link" to="/discover">
          Discover
        </Link>
        {!user && (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
        {user && (
          <Link className="link" to="/" onClick={logout}>
            Logout
          </Link>
        )}
      </div>
      {/* castings, Discover   login */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/casting"
          element={
            <Casting
              userData={{ user, setUser }}
              tokenData={{ token, setToken }}
              errorData={{ error, setError }}
            />
          }
        />
        <Route
          path="cast/:castid"
          element={
            <Cast
              userData={{ user, setUser }}
              tokenData={{ token, setToken }}
              errorData={{ error, setError }}
            />
          }
        />
        <Route
          path="/discover"
          element={
            <Discover
              userData={{ user, setUser }}
              tokenData={{ token, setToken }}
              errorData={{ error, setError }}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              userData={{ user, setUser }}
              tokenData={{ token, setToken }}
              errorData={{ error, setError }}
            />
          }
        />
          <Route
          path="/register"
          element={
            <Register
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