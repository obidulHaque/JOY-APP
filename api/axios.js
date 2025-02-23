import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3000/api/",
  //  "http://192.168.1.39:3000/api/",
  headers: {
    "Content-Type": "application/json",
    "app-key": "api-key",
  },
});

export default Axios;
