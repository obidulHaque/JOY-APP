import axios from "axios";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const APP_KEY = Constants.expoConfig.extra.APP_KEY;

const Axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "app-key": APP_KEY, // Custom header from env
  },
});

export default Axios;
