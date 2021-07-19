import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ForgotPasswordScreen.css";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory()

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "api/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);

      setTimeout(() => {
        history.push("/login")
      }, 3000)

    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen___form"
      >
        <h3 className="forgotpassword-screen___title">Forgot password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen___subtext">
            Please enter the email address you registered your account with. We
            will send you a reset password confirmation to this email.
          </p>
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
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordScreen;
