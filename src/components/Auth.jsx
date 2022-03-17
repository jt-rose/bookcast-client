import axios from "axios";
import { useState } from "react";

export const serverURL = "https://bookcast-server.herokuapp.com";
//   process.env.NODE_ENV === "production"
//     ? "https://bookcast-server.herokuapp.com"
//     : "http://localhost:8000";

const Auth = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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
        setToken(response.data.token);
      });
  };

  const login = () => {
    axios
      .post(serverURL + "/api/auth/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => setToken(response.data.token));
  };

  const getUser = () => {
    axios
      .get(serverURL + "/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((response) => console.log(response));
  };

  const logout = () => {
    axios
      .post(serverURL + "/api/auth/logout", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((response) => {
        console.log(response);
        //setToken('')
      });
  };

  return (
    <div>
      <h1>Auth Test</h1>
      <p>Token: {token ? token : "NA"}</p>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={register}>Register</button>
      <br />

      <label htmlFor="login-username">Login Username</label>
      <input
        type="text"
        id="login-username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <label htmlFor="login-password">Login Password</label>
      <input
        type="password"
        id="login-password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={login}>login</button>
      <br />
      <button onClick={getUser}>get user</button>
      <br />
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Auth;
