import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import "./LoginScreen.css";


function LoginScreen() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const onLogin = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const {data} = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {

      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="login-screen">
      <form onSubmit={onLogin} className="login-screen___form">
        <h3 className="login-screen___title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            required
            id="email"
            placeholder="Enter email"
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:
            <Link to="/forgotpassword" className="login-screen___forgotpassword" tabIndex={4} >Forgot Password</Link>
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
            required
            id="password"
            placeholder="Enter password"
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary" tabIndex={3}>
          Login
        </button>
        <span className="login-screen___subtext">
          Do not have an account?<Link to="/Register">Register</Link>
        </span>
      </form>
    </div>
  );
}

export default LoginScreen;
