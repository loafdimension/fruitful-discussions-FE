import axios from "axios";

const instance = axios.create({
  baseURL: "https://nc-news-project-t1h4.onrender.com",
  timeout: 5000,
});

export default instance;
