import React, { useState, useEffect } from "react";
import { BsCloudUpload } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

import { resetReport } from "../../features/reports/reportSlice";
import {
  createReport,
  getReports,
  deleteReport,
} from "../../features/reports/reportSlice";

import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import "./landing.css";
import Spinner from "../../components/Spinner";
import moment from "moment";

const Landing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  // access the user from redux
  const { user } = useSelector((state) => state.auth);

  // access the reports
  const { reports, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.reports
  );

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
          setImage(data.url);
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

    if (!title || !category || !description) {
      toast({
        title: "Title, category and description needed",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else {
      try {
        const reportData = { title, category, image, description };
        // console.log(profile);
        dispatch(createReport(reportData));
        handleClear();

        toast({
          title: "Sent successfully",
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

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  const handleClear = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setImage("");
  };

  const handleDelete = (reportId) => {
    console.log(reportId);
    try {
      dispatch(deleteReport(reportId));
      handleClear();

      toast({
        title: "Cleared successfully",
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
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getReports());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div className="landingWrapper">
      <div className="landingContainer">
        <div className="landingProfile">
          <h1>Hello {user && user.name}. Here is your info</h1>

          <div className="landingProfileShowInfo">
            <div className="landingProfileImage">
              <img src={user && user.profile} alt={user && user.name} />
            </div>
            {/*  */}
            <div className="landingProfileText">
              <p>
                <span>Name</span>
                {user && user.name}
              </p>
              <p>
                <span>Email</span> {user && user.email}
              </p>
            </div>
            <div className="landingProfileEdit">
              {/* <button>Edit Personal Details</button> */}
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>

          {/* profile edit */}
        </div>

        {/* Posted issues */}

        {isLoading ? (
          <Spinner message="Please wait" />
        ) : (
          <div className="previouslyPostedIssues">
            <h2>Previously posted reports</h2>
            <div className="prevContainer">
              {reports.length > 0 ? (
                <>
                  {reports.map((report) => (
                    <div className="issue" key={report._id}>
                      <div className="issueTitle">
                        <div className="issueTitleDesc">
                          <h3>
                            <span>Status:</span> Pending
                          </h3>
                          <h3>
                            <span>Created:</span>{" "}
                            {moment(report.createdAt).fromNow()}
                          </h3>
                        </div>

                        <h4>
                          <span>Title</span> {report.title}
                        </h4>

                        <p>{report.description}</p>

                        <img
                          src={
                            report.image ||
                            "https://images.pexels.com/photos/1764702/pexels-photo-1764702.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          }
                          alt=""
                        />
                      </div>
                      <div className="issueOptions">
                        <span onClick={() => handleDelete(report._id)}>
                          Clear
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="noReport">
                  <h3>You have no reports. Create a report to show here </h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="createIssueWrapper">
        <div className="createIssueContainer">
          <h2>Report an issue</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Enter a title</label>
            <input
              type="text"
              placeholder="Your title"
              value={title}
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="category">Suitable Category</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="volvo" disabled>
                Select
              </option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>

            <label htmlFor="description">Enter a description</label>
            <textarea
              value={description}
              placeholder="Your description"
              rows="4"
              id="description"
              cols="50"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <span style={{ fontSize: "20px" }}>
              Please attach a relevant image
            </span>
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

            {loading ? (
              <Spinner message="Uploading" />
            ) : (
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            )}
            <h6 onClick={handleClear}>Clear</h6>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
