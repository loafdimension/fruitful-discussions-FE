import axios from "axios";

const allArticles = axios.create({
  baseURL: "https://nc-news-project-t1h4.onrender.com",
  timeout: 5000,
});

export default allArticles;
