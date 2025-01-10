import axios from "axios";

const Axios = axios.create({
  baseURL: "http://192.168.1.16:3000/api",
  //  "http://192.168.1.16:3000/api/sign-in",
  headers: {
    "Content-Type": "application/json",
    "app-key": "124jjj124", // Custom header
  },
});

export default Axios;
