import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../../../api/api";

function ArticleCards() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    instance(`/api/articles`)
      .then((response) => {
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
          <Link
            to={`/articles/${article.article_id}`}
            key={article.article_id}
            className="article-card"
          >
            <div className="article-card" key={article.article_id}>
              <h2 className="article-title">{article.title}</h2>
              <img
                className="article-image"
                src={article.article_img_url}
                alt={article.title}
              />
              <div className="article-info">
                <p className="article-topic">
                  <strong>Topic: </strong>
                  {article.topic}
                </p>
                <p className="article-author">
                  <strong>Posted by: </strong>
                  {article.author}
                </p>
                <p className="article-votes">
                  <strong>Votes: </strong>
                  {article.votes}
                </p>
                <p className="article-comments">
                  <strong>Comments: </strong>
                  {article.comment_count}
                </p>
              </div>
            </div>
            <button className="read-more-button">Read More</button>
          </Link>
        );
      })}
    </div>
  );
}

export default ArticleCards;
