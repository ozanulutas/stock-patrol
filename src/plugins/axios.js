import axios from "axios"

const axs = axios.create();

const { // get values from .env
  VUE_APP_API_URL: API_URL,
  VUE_APP_API_HOST: API_HOST,
  VUE_APP_API_KEY: API_KEY
} = process.env

axs.defaults.baseURL = API_URL;
axs.defaults.headers.common['x-rapidapi-host'] = API_HOST;
axs.defaults.headers.common['x-rapidapi-key'] = API_KEY;

export default axs;