import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Import CSS

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });

      if (response.data) {
        alert("User registered successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "An error occurred during registration.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="logo">ChatCat</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
      <div className="auth-box login-box">
        <p>Already have an account? <span onClick={() => navigate("/login")}>Log in</span></p>
      </div>
    </div>
  );
};

export default Register;
