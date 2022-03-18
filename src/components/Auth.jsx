import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export const serverURL = "https://bookcast-server.herokuapp.com";
//   process.env.NODE_ENV === "production"
//     ? "https://bookcast-server.herokuapp.com"
//     : "http://localhost:8000";

const Auth = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  let navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();
    axios
      .post(serverURL + "/api/auth/register", {
        username,
        password,
        email,
      })
      .then((response) => {
        console.log(response);
        props.tokenData.setToken(response.data.token);
        props.userData.setUser(response.data.user);
        props.errorData.setError(false);
        navigate("/");
      })
      .catch((err) => props.errorData.setError(err));
  };

  const login = () => {
    axios
      .post(serverURL + "/api/auth/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => {
        props.tokenData.setToken(response.data.token);
        props.userData.setUser(response.data.user);
        props.errorData.setError(false);
        navigate("/");
      })
      .catch((err) => props.errorData.setError(err));
  };

  const getUser = () => {
    axios
      .get(serverURL + "/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + props.tokenData.token,
        },
      })
      .then((response) => {
        console.log(response);
        props.userData.setUser(response.data);
        props.errorData.setError(false);
      })
      .catch((err) => props.errorData.setError(err));
  };

  return (
    <div>
      {props.errorData.error && (
        <p style={{ color: "red" }}>Error: {props.errorData.error.message}</p>
      )}
      <h1>Auth Test</h1>
      <p>Token: {props.tokenData.token ? props.tokenData.token : "NA"}</p>
      <div className="signup">
      <label htmlFor="username">Username</label>
      <input className = "forms"
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input className = "forms"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input className = "forms"
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn" onClick={register}>Register</button>
      <br />
        </div>
        <div className="login">
      <label htmlFor="login-username">Login Username</label>
      <input className = "forms"
        type="text"
        id="login-username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <label htmlFor="login-password">Login Password</label>
      <input className = "forms"
        type="password"
        id="login-password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button className="btn" onClick={login}>login</button>
      </div>
      <br />
      <button className="btn" onClick={getUser}>get user</button>
    </div>
  );
};

export default Auth;