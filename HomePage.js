import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001");
      const json = await response.json();
      setMsg(json.msg);
    }
    fetchData();
  });
  
  return (
    <div className="home-page">
      <h1>Welcome to our Gym</h1>
      {msg && <div> {msg} </div>}
      <p>Our mission is to help you achieve your fitness goals</p>
      <button>
        {" "}
        <Link to="/register">Sign up now</Link>{" "}
      </button>
    </div>
  );
};

export default HomePage;
