import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
})
// https://ph-jobs-server.onrender.com/api/v1
export default axiosSecure;