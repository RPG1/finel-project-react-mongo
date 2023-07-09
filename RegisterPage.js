import React, { useState } from "react";
import NavBar from "./Nav";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = { username, email, password };
    try {
      await register(user);
      console.log("Registration successful!");
      setEmail("");
      setUsername("");
      setPassword("");
      setError("");
    } catch (err) {
      setEmail("");
      setUsername("");
      setPassword("");
      setError(err.message);

      console.log("Error registering user");
    }
  }

  async function register(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("http://localhost:3001/users/register", options);
    const { status } = response;
    if (status === 201) {
      console.log("youre successfuly");
    } else {
      console.log("youre not successfuly");
    }
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      setToken(data.user.token)
      localStorage.setItem('token', data.user.token)
    } else {
      const errorMessage = data.error || "Error registering user";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  return (
    <div className="bacReg">
      <div>
        <NavBar />
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button id="btn_reg" type="submit" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
