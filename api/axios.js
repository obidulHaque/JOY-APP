import axios from "axios";

const Axios = axios.create({
  baseURL: "http://192.168.1.16:3000/api",
  // "http://192.168.1.16:3000/api"
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
