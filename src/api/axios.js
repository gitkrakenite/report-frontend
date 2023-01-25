import axios from "axios";

const instance = axios.create({
  baseURL: "https://report-backend.vercel.app/",
});

export default instance;

// const BASE_URL = "http://localhost:5000/api/v1/report/admin/39104245/";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default {
//   axiosInstance,
// };
