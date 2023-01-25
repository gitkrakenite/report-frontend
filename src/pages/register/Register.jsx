import React, { useState, useEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { BsCloudUpload } from "react-icons/bs";
import "./register.css";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";

import { useToast } from "@chakra-ui/react";

// useSlector is used to read stuff from state and useDispatch to trigger actions

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // toast.error(message);
      toast({
        title: `Something went wrong`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    if (isSuccess || user) {
      toast({
        title: "Action Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Convert image into url using cloudinary
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === null || undefined) {
      toast({
        title: "Please select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "hooksie");
      data.append("cloud_name", "ddyw2aavm");
      fetch("https://api.cloudinary.com/v1_1/ddyw2aavm/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // if we dont have a response from cloudinary back which is data.url then we will show an error
          if (data.url === undefined) {
            toast({
              title: "Please select an Image",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
          }
          setProfile(data.url);
          setLoading(false);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast({
        title: "Password don't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (!name || !email || !password) {
      toast({
        title: "Name, email and password needed",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else {
      try {
        const userData = { name, email, profile, password };
        // console.log(profile);
        dispatch(register(userData));
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  return (
    <div className="registerWrapper">
      <div className="registerContainer">
        <div className="imageSlide">
          <img
            src="https://images.pexels.com/photos/9158997/pexels-photo-9158997.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
        </div>
        <div className="formSlide">
          <h1>Manchester University</h1>

          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              value={name}
              placeholder="Your Full Name (text only)"
              pattern="[A-Za-z]"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              required
              placeholder="Enter your student email"
              value={email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              id=""
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <div className="fileUpload">
              <BsCloudUpload className="upload" />

              <input
                type="file"
                name=""
                id=""
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              <p>
                Recommendation: Use high-quality JPG, JPEG, SVG or PNG as your
                profile
              </p>
            </div>

            <input
              type="password"
              required
              value={password}
              placeholder="Password more than 8 characters"
              id=""
              pattern=".{8,}"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              name=""
              value={password2}
              placeholder="Confirm Password"
              id=""
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />

            {isLoading || loading ? (
              <Spinner message="Activity happening" />
            ) : (
              <button type="submit" onClick={handleSubmit}>
                Register
              </button>
            )}
          </form>

          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <div className="form__slideOptions">
              <span>Already have an account ? Login</span>
              <FiArrowUpRight />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
