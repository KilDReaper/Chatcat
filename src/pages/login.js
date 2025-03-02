import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Can be username or email
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        identifier,
        password,
      });

      if (response.data) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/chat");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "An error occurred during login.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="logo">ChatCat</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
        <p className="forgot">Forgot password?</p>
      </div>
      <div className="auth-box signup-box">
        <p>Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span></p>
      </div>
    </div>
  );
};

export default Login;
