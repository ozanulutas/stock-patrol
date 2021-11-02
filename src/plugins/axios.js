import axios from "axios"

const { // get values from .env
  VUE_APP_API_URL: API_URL,
  VUE_APP_API_HOST: API_HOST,
  VUE_APP_API_KEY: API_KEY
} = process.env

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['x-rapidapi-host'] = API_HOST;
axios.defaults.headers.common['x-rapidapi-key'] = API_KEY;

export default axios;