import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import "./login.css";

import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <div className="login__formSlide">
          <h1>Co-operative University</h1>

          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              value={username}
              placeholder="Create a username"
              id=""
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <input
              type="password"
              name=""
              value={password}
              placeholder="Create a secure password"
              id=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </form>

          <Link to={"/register"} style={{ textDecoration: "none" }}>
            <div className="loginform__slideOptions">
              <span>Are you new here ? Register</span>
              <FiArrowUpRight />
            </div>
          </Link>
        </div>

        {/*  */}
        <div className="loginimageSlide">
          <img
            src="https://images.pexels.com/photos/6147083/pexels-photo-6147083.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
