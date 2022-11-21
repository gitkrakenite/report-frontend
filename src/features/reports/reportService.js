import axios from "axios";

// this file is strictly for the http requests, sending the data back

const API_URL = "http://localhost:5000/api/v1/report/";

// create report
const createReport = async (reportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, reportData, config);

  return response.data;
};

// get my report
const getReport = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// get all reports
const getAllReports = async () => {
  const response = await axios.get(`${API_URL}admin/39104245`);
  return response.data;
};

// updateReport reports
const updateReport = async (reportId, reportData) => {
  const response = await axios.put(
    `${API_URL}admin/39104245/${reportId}`,
    reportData
  );
  return response.data;
};

// delete my report
const deleteReport = async (reportId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + reportId, config);

  return response.data;
};

const reportService = {
  createReport,
  getReport,
  deleteReport,
  getAllReports,
  updateReport,
};

export default reportService;
