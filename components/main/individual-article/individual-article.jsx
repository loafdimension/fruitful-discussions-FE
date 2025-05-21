import useArticle from "../../../custom-hooks/use-article";
import { useParams } from "react-router-dom";
import Comments from "./individual-article-elements/comments";

function IndividualArticle() {
  const { article_id } = useParams();
  const { article, error } = useArticle(article_id);

  if (error || !article) return <p>Error loading article</p>;

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
      <p className="article-votes">
        <strong>Votes: </strong>
        {article.votes}
      </p>
      <p className="article-comments">
        <strong>Comments: </strong>
        {article.comment_count}
      </p>
      <Comments />
    </div>
  );
}

export default IndividualArticle;
