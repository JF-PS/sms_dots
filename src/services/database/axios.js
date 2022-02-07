import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_API_KEY,
  timeout: 200000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) ||
        "Axios Interceptor Something went wrong"
    )
);

export default axiosInstance;
