import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_USER
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
