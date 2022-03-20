import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/auth.css";
import "../styles/jihee.css";

export const serverURL = "https://bookcast-server.herokuapp.com";
//   process.env.NODE_ENV === "production"
//     ? "https://bookcast-server.herokuapp.com"
//     : "http://localhost:8000";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
    <>
    
      <div className="signup">
      <Link to= '/login'><button className="auth">Already have an account?</button></Link>

      <div className="signupInput">
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
      </div>
      </div>


      {/* <button className="btn" onClick={getUser}>get user</button> */}
            {/* {props.errorData.error && (
        <p style={{ color: "red" }}>Error: {props.errorData.error.message}</p>
      )}
      <p>Token: {props.tokenData.token ? props.tokenData.token : "NA"}</p> */}

    </>
  );
};

export default Register;