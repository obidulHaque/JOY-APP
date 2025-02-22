import axios from "axios";

const Axios = axios.create({
  baseURL: "http://192.168.1.54:3000/api/",
  //  "http://192.168.1.39:3000/api/",
  headers: {
    "Content-Type": "application/json",
    "app-key": "124jjj124", // Custom header
  },
});

export default Axios;
