import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import instance from "../../../api/api";
import ShareButtons from "../share-buttons";

function ArticleCards() {
  const [articles, setArticles] = useState([]);
  const { article_id } = useParams();
  const [visibleShareArticleId, setVisibleShareArticleId] = useState(null);

  const shareURL = `https://fruitful-discussions.netlify.app/${article_id}`;

  function handleClickShare(articleId) {
    setVisibleShareArticleId((prev) => (prev === articleId ? null : articleId));
  }

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
        const isShareVisible = visibleShareArticleId === article.article_id;
        const shareURL = `https://fruitful-discussions.netlify.app/articles/${article.article_id}`;

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
              <button
                className="share-button"
                onClick={() => handleClickShare(article.article_id)}
              >
                <img src="/images/share-2.svg" />
                <strong className="share-text">Share</strong>
              </button>
            </div>

            {isShareVisible && (
              <ShareButtons url={shareURL} title={article.title} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ArticleCards;
