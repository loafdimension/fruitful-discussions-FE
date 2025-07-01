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
          <div className="article-card" key={article.article_id}>
            <div className="article-card-header-elements">
              <p className="article-author">{article.author}</p>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-topic">
                <strong>{article.topic}</strong>
              </p>
              <Link
                to={`articles/${article.article_id}`}
                className="read-more-button"
              >
                <strong>Read More</strong>
              </Link>
            </div>
            <img
              className="article-image"
              src={article.article_img_url}
              alt={article.title}
            />
            <div className="article-card-footer-icons">
              <button className="article-comments">
                <img src="/images/message-circle.svg" />
                <strong className="comments-number">
                  {article.comment_count}
                </strong>
              </button>
              <button className="article-votes">
                <img src="/images/thumbs-up.svg" />
                <strong className="votes-number">{article.votes}</strong>
              </button>
              <button className="share-button">
                <img src="/images/share-2.svg" />
                <strong className="share-text">Share</strong>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ArticleCards;
