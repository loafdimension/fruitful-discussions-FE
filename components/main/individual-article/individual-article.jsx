import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useArticle from "../../../custom-hooks/use-article";
import Comments from "./individual-article-elements/comments";
import Votes from "./individual-article-elements/votes";
import Loader from "../../loading/loading";
import ErrorMessage from "../errors/errors";
import ShareButtons from "../share-buttons";

function IndividualArticle() {
  const { article_id } = useParams();
  const { article, error, isLoading } = useArticle(article_id);
  const [commentCount, setCommentCount] = useState(0);
  const [showShareButtons, setShowShareButtons] = useState(false);

  const shareURL = `https://fruitful-discussions.netlify.app/${article_id}`;

  function handleClickShare() {
    setShowShareButtons(function (prev) {
      return !prev;
    });
  }

  useEffect(() => {
    if (article) setCommentCount(article.comment_count);
  }, [article]);

  const incrementCommentCount = () =>
    setCommentCount((previousCount) => previousCount + 1);
  const decrementCommentCount = () =>
    setCommentCount((previousCount) => Math.max(0, previousCount - 1));

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="individual-article-container">
      <div className="main-article-elements">
        <p className="article-author">{article.author}</p>
        <h2 className="article-title">{article.title}</h2>
        <p className="article-topic">
          <strong>{article.topic}</strong>
        </p>
        <p className="article-body">{article.body}</p>
      </div>

      <img
        className="article-image"
        src={article.article_img_url}
        alt={article.title}
      />

      <div className="article-footer-icons">
        <button className="article-comments">
          <img src="/images/message-circle.svg" />
          <strong className="comments-number">{article.comment_count}</strong>
        </button>
        <button
          className="article-votes"
          article_id={article_id}
          initialVotes={article.votes}
        >
          <img src="/images/thumbs-up.svg" />
          <strong className="votes-number">{article.votes}</strong>
        </button>
        <button className="share-button" onClick={handleClickShare}>
          <img src="/images/share-2.svg" />
          <strong className="share-text">Share</strong>
        </button>
      </div>

      {showShareButtons && (
        <ShareButtons url={shareURL} title={article.title} />
      )}

      {/* <Votes article_id={article_id} initialVotes={article.votes} />
      <p className="article-comments">
        <strong>Comments: </strong>
        {commentCount}
      </p> */}

      <Comments
        article_id={article_id}
        onIncrementCommentCount={incrementCommentCount}
        onDecrementCommentCount={decrementCommentCount}
      />
    </div>
  );
}

export default IndividualArticle;
