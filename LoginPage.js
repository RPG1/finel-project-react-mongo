import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "./Nav";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const checkUserRole = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/users/admin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.isAdmin;
      } else {
        console.error("User role check failed!");
        return false;
      }
    } catch (error) {
      console.error("An error occurred during user role check:", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        console.log("Login successful!");
        const data = await response.json();
        const token = data.user.token;
        localStorage.setItem("token", token);
        const isAdmin = await checkUserRole(token);
  
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/Userpage");
        }
      } else {
        console.log("Login failed!");
        const data = await response.json();
        setErrorMessage(data.error || "Invalid username or password");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="LoginBac">
      <div>
        <NavBar />
        <form onSubmit={handleSubmit}>
          {errorMessage && <p>{errorMessage}</p>}
          <label className="Llab">
            Username:
            <input
              className="Usetext"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <label className="Llab">
            Password:
            <input
              className="Passtext"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button className="Logbtn" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm; 

