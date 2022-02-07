import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-35-180-207-47.eu-west-3.compute.amazonaws.com:8080",
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
