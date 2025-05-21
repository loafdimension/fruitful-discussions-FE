import useArticle from "../../../custom-hooks/use-article";
import { useParams } from "react-router-dom";
import Comments from "./individual-article-elements/comments";
import Votes from "./individual-article-elements/votes";
import Loader from "../../loading/loading";
import ErrorMessage from "../errors/errors";

function IndividualArticle() {
  const { article_id } = useParams();
  const { article, error, isLoading } = useArticle(article_id);

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
        {article.comment_count}
      </p>
      <Comments />
    </div>
  );
}

export default IndividualArticle;
