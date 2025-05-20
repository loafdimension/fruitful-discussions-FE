import { useState, useEffect } from "react";
import allArticles from "../../../../api/api";
import "./article-cards.css";

function ArticleCards() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    allArticles(`/api/articles`)
      .then((response) => {
        console.log(response, "fetching all articles from my api");
        setArticles(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <div className="article-cards-container">
      {articles.map((article) => {
        return (
          <div className="article-card" key={article.article_id}>
            <h2 className="article-title">{article.title}</h2>
            <p className="article-body">{article.body}</p>
            <p className="article-image-url">{article.article_img_url}</p>
            <p className="article-topic">{article.topic}</p>
            <p className="article-author">{article.author}</p>
            <p className="article-votes">{article.votes}</p>
            <p className="article-comments">{article.comment_count}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ArticleCards;
