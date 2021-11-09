import axios from "axios"

// axios instance for api calls
const axiosInstance = axios.create();

// get values from .env
const { 
  VUE_APP_API_URL: API_URL,
  // VUE_APP_USER_AGENT: USER_AGENT,
  VUE_APP_API_KEY: API_KEY
} = process.env

// set default axios values to use in api calls
axiosInstance.defaults.baseURL = API_URL;
// axiosInstance.defaults.headers.common['User-Agent'] = USER_AGENT;
axiosInstance.defaults.params = {}
axiosInstance.defaults.params['apikey'] = API_KEY

export default axiosInstance;