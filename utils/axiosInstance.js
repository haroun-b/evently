import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://the-evently-api.herokuapp.com",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("authToken")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "authToken"
      )}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export default axiosInstance