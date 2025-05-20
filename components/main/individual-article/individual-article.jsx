import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../../api/api";

function IndividualArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    instance(`/api/articles/${article_id}`)
      .then((response) => {
        console.log(response.data, "<<< individual article");
        setArticle(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [article_id]);

  if (!article) {
    return <p>ERROR</p>;
  }

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
    </div>
  );
}

export default IndividualArticle;
