import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useArticle from "../../../custom-hooks/use-article";
import Comments from "./individual-article-elements/comments";
import Votes from "./individual-article-elements/votes";
import Loader from "../../loading/loading";
import ErrorMessage from "../errors/errors";

function IndividualArticle({user}) {
  const { article_id } = useParams();
  const { article, error, isLoading } = useArticle(article_id);
  const [commentCount, setCommentCount] = useState(0);

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
    <div className="individual-article">
      <h2 className="article-title">{article.title}</h2>
      <p className="article-body">{article.body}</p>
      <img
        className="article-image"
        src={article.article_img_url}
        alt={article.title}
      />
      <p className="article-topic">
        <strong>Topic: </strong>
        {article.topic}
      </p>
      <p className="article-author">
        <strong>Posted by: </strong>
        {article.author}
      </p>
      <Votes article_id={article_id} initialVotes={article.votes} />
      <p className="article-comments">
        <strong>Comments: </strong>
        {commentCount}
      </p>
      <Comments
        article_id={article_id}
        onIncrementCommentCount={incrementCommentCount}
        onDecrementCommentCount={decrementCommentCount}
        user={user}
      />
    </div>
  );
}

export default IndividualArticle;
