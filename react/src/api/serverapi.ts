import axios from "axios";
// import { store } from "../store/store";

const SERVERURL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: SERVERURL,
  validateStatus: function (status) {
    return status >= 200 && status <= 404; // default
  },
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // let token = undefined
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else  alert("Please Authenticate Yourself")
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  if (response.status == 404) {
    console.log("404 occurred");
    localStorage.removeItem("token");
  }
  return response;
});
export { axiosInstance };
