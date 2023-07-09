import React, { useEffect, useState } from "react";
import "../CssNew/userPage.css";
import { useNavigate } from "react-router-dom";

const UserPage = ({ username }) => {
  const [data, setData] = useState("");
  const Navigate = useNavigate();

  async function getUserData() {
    console.log("test");
    const token = localStorage.getItem("token");
    const userData = await fetch("http://localhost:3001/users/me", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const res = await userData.json();
    setData(res);
  }

  useEffect(() => {
    const t = async () => {
      await getUserData();
    };
    t();
  }, []);

  async function logoutuser() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/users/logout", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.ok) {
        localStorage.removeItem("token");
        Navigate("/");
        console.log("Logout successful");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("An error occurred during logout:", error);
    }
  }
  return (
    <div className="user-page-container">
      <h1 id="user">Welcome to Your User Page, {data && data.username}!</h1>
      <p>Here's some content specific to the logged-in user.</p>
      <button className="logout-button" onClick={logoutuser}>
        Logout
      </button>
    </div>
  );
};

export default UserPage;
