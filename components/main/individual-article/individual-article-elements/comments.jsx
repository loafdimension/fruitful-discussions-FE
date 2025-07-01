import useComments from "../../../../custom-hooks/use-comments";
import PostComment from "./post-comment";
import { useState, useEffect } from "react";

function Comments({
  article_id,
  onIncrementCommentCount,
  onDecrementCommentCount,
}) {
  const {
    comments: fetchedComments,
    error,
    isLoading,
  } = useComments(article_id);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (fetchedComments) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);

  if (error) return <p>Error loading comments</p>;
  if (isLoading) return <p>Loading comments...</p>;

  function handleNewCommentOptimisticSuccess(newComment) {
    setComments((previousComments) => [newComment, ...previousComments]);
    if (onIncrementCommentCount) onIncrementCommentCount();
  }

  function handleNewCommentOptimisticFail(temporary_id) {
    setComments((previousComments) =>
      previousComments.filter(
        (comment) => comment.temporary_id !== temporary_id
      )
    );
    if (onDecrementCommentCount) onDecrementCommentCount();
  }

  return (
    <div className="comments">
      <h3>Comments</h3>
      <button className="add-comment">Post your comment here!</button>
      <ul className="comments-list">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment">
              <p>
                <strong>{comment.author}</strong> •{" "}
                {new Date(comment.created_at).toLocaleString()}
              </p>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
      {/* <PostComment
        article_id={article_id}
        onOptimisticCommentSuccess={handleNewCommentOptimisticSuccess}
        onOptimisticCommentFail={handleNewCommentOptimisticFail}
      /> */}
    </div>
  );
}

export default Comments;
