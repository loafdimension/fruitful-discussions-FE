import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticleCards from "../components/main/article-cards/article-cards";
import IndividualArticle from "../components/main/individual-article/individual-article";

function App() {
  return (
    <>
      <h1>Fruitful Discussions</h1>
      <Routes>
        <Route path="/" element={<ArticleCards />} />
        <Route path="/articles" element={<ArticleCards />} />
        <Route path="/home" element={<ArticleCards />} />
        <Route path="/articles/:article_id" element={<IndividualArticle />} />
      </Routes>
    </>
  );
}

export default App;
