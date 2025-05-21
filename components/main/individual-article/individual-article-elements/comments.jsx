import { useParams } from "react-router-dom";
import useComments from "../../../../custom-hooks/use-comments";

function Comments() {
  const { article_id } = useParams();
  const { comments, error } = useComments(article_id);

  if (error || !comments) return <p>Error loading comments</p>;

  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment">
              <p>
                <strong>{comment.author}</strong>
              </p>
              <p>{comment.body}</p>
              <p>
                <p>{new Date(comment.created_at).toLocaleString()}</p>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Comments;
