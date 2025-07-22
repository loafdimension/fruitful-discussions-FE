import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticleCards from "../components/main/article-cards/article-cards";
import IndividualArticle from "../components/main/individual-article/individual-article";
import Header from "../components/header/header";
import LogInPage from "../components/main/log-in/log-in-page";

function App() {
  return (
    <>
      <header className="page-header">
        <Header />
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ArticleCards />} />
          <Route path="/articles" element={<ArticleCards />} />
          <Route path="/home" element={<ArticleCards />} />
          <Route path="/articles/:article_id" element={<IndividualArticle />} />
          <Route path="login" element={<LogInPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
