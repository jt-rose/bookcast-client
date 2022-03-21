import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/auth.css";
import "../styles/jihee.css";

export const serverURL = "https://bookcast-server.herokuapp.com";

const Login = (props) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  let navigate = useNavigate();

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

  return (
    <>
      <div className="login">
        <Link to="/register">
          {" "}
          <button className="auth">Don't have an account yet?</button>
        </Link>
        <div className="loginInput">
          <label htmlFor="login-username"> Username</label>
          <input
            className="forms"
            type="text"
            id="login-username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <label htmlFor="login-password"> Password</label>
          <input
            className="forms"
            type="password"
            id="login-password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className="btn" onClick={login}>
            login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
