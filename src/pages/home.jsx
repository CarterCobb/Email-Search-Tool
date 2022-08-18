import React from "react";
import Login from "../components/login";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Email Search Tool</h1>
      <p>Please login using your Gmail account:</p>
      <Login />
    </div>
  );
};

export default HomePage;
