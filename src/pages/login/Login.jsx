import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import "./login.css";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <div className="login__formSlide">
          <h1>Co-operative University</h1>

          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name=""
              value={email}
              placeholder="Your Student Email"
              id=""
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              type="password"
              name=""
              value={password}
              placeholder="Enter your password"
              id=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            )}
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
