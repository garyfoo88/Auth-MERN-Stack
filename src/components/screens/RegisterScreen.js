import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./RegisterScreen.css";
const axios = require("axios");

function RegisterScreen() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const onRegister = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = axios.post(
        "api/auth/register",
        {
          username,
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
    <div className="register-screen">
      <form onSubmit={onRegister} className="register-screen___form">
        <h3 className="register-screen___title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            required
            id="name"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            required
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
            required
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">ConfirmPassword:</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="text"
            required
            id="confirmpassword"
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <span className="register-screen___subtext">
          Already have an account?<Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default RegisterScreen;
