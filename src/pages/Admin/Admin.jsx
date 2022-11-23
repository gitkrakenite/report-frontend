import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import "./admin.css";

import { AiOutlineDelete } from "react-icons/ai";

import {
  getAllReports,
  updateReport,
} from "../../features/reports/reportSlice";
import Spinner from "../../components/Spinner";
import moment from "moment";
import axios from "axios";

const Admin = () => {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyFetched, setAlreadyFetched] = useState(false);

  const [fetchedCategory, setFetchedCategory] = useState();

  const url = "http://localhost:5000/api/v1/report/admin/39104245/";

  // access the user from redux
  const { user } = useSelector((state) => state?.auth);

  // access the reports
  const { reports, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.reports
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleUpdate = async (id) => {
    // console.log(id);
    // console.log(status);
    // dispatch(updateReport(id, status));

    try {
      const payload = { status };
      const response = await axios.put(`${url}${id}`, payload);
      if (response) {
        toast({
          title: "Updated Successfully. Refresh to see changes",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    // console.log(response.data);
  };

  // create category
  const handleCategory = async () => {
    try {
      const payload = { category };
      const response = await axios.post(url, payload);
      if (response) {
        toast({
          title: "Created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      setCategory("");
    } catch (error) {
      toast({
        title: "A category like this exists",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setCategory("");
    }
  };

  // fetch categories from db
  const fetchCategories = async () => {
    try {
      let response = await axios.get(`${url}cat`);
      setLoading(true);
      // console.log(response);
      setFetchedCategory(response?.data);
      setLoading(false);
      setAlreadyFetched(true);
      console.log(fetchedCategory);
    } catch (error) {}
  };

  const hideCategories = () => {
    setFetchedCategory();
    setAlreadyFetched(false);
  };

  const handleDeleteCategory = async (id) => {
    const response = await axios.delete(`${url}${id}`);

    if (response) {
      toast({
        title: "Deletion Succesful. Refresh",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // useEffect(() => {
  //   let isMounted = true;

  //   if (isMounted) {
  //     (async () => {
  //       try {
  //         setLoading(true);
  //         const response = await axios.get(`${url}cat`);
  //         if (response?.status === 200) {
  //           console.log(response);
  //           setLoading(false);
  //           setFetchedCategory(response?.data);
  //         }
  //       } catch (error) {
  //         setLoading(false);
  //         console.log(error);
  //       }
  //     })();
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  useEffect(() => {
    if (user?.isAdmin === "false") {
      navigate("/");
      toast({
        title: "You are not an admin. Contact system admin",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    dispatch(getAllReports());
  }, [user, dispatch, navigate]);

  return (
    <div className="adminWrapper">
      <div className="adminContainer">
        <h6>Welcome {user.name} You are in the admin side</h6>
        <div className="adminDetailsWrapper">
          <div className="adminDetails">
            <div className="adminImg">
              <img src={user.profile} alt="" />
            </div>
            <div className="adminTextDet">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
            <div className="adminDetOption">
              <span>Logout</span>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <h5>Back</h5>
              </Link>
            </div>
          </div>
          {/*  */}
          <div className="adminCreateCatgeory">
            <form onSubmit={handleCategory}>
              <label htmlFor="category">Create a New Category</label>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="New Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <span onClick={handleCategory}>Create</span>
            </form>
          </div>
          {/*  */}
          <div className="adminDeleteCategory">
            {alreadyFetched ? (
              <span onClick={hideCategories}>Hide Categories</span>
            ) : (
              <span onClick={fetchCategories}>See All Categories</span>
            )}
            {loading ? (
              <Spinner message="please wait" />
            ) : (
              <>
                {fetchedCategory?.map((cat) => (
                  <div className="AdminDeleteItem" key={cat._id}>
                    <p>{cat.category}</p>
                    <h3>
                      <AiOutlineDelete
                        onClick={() => handleDeleteCategory(cat._id)}
                      />
                    </h3>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/*  */}
        <div className="adminAllReports">
          <h6>All reports</h6>
          <div className="AdminAllReport">
            {isLoading ? (
              <Spinner message="Please wait" />
            ) : (
              <>
                {reports?.length > 0 ? (
                  <>
                    {reports.map((report) => (
                      <div className="allReportsItem" key={report._id}>
                        <div className="reportItemTop">
                          <h5>
                            Sender's Email:{" "}
                            <a
                              href={`mailto:${report.email}`}
                              style={{ textDecoration: "none" }}
                            >
                              {report.email}
                            </a>{" "}
                          </h5>
                          <p>Sender's Name: {report.name}</p>
                          <span>
                            Sent: {moment(report.createdAt).fromNow()}
                          </span>
                        </div>
                        <div className="reportItemSec">
                          <p>Title: {report.title}</p>
                          <p>Category: {report.category}</p>
                        </div>
                        <div className="reportItemThird">
                          <p>{report.description}</p>
                          <img
                            src={
                              report.image
                                ? report.image
                                : "https://images.pexels.com/photos/14029260/pexels-photo-14029260.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            }
                            alt=""
                          />
                        </div>
                        <div className="reportItemFourth">
                          <p>Current status: {report.status || "pending"}</p>
                          <form onSubmit={handleUpdate}>
                            <label htmlFor="update">Update Status</label>
                            <select
                              type="text"
                              name="update"
                              id="update"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              <option value="received">Received</option>
                              <option value="sorted">Sorted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <span
                              type="submit"
                              onClick={() => handleUpdate(report._id)}
                            >
                              Update
                            </span>
                            <span>
                              <a href="mailto:">Email to someone</a>
                            </span>
                          </form>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Nope</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
