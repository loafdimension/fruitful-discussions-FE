import useComments from "../../../../custom-hooks/use-comments";
import PostComment from "./post-comment";
import { useState, useEffect } from "react";
import instance from "../../../../api/api";

function Comments({
  article_id,
  onIncrementCommentCount,
  onDecrementCommentCount,
  user,
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

  function handleDelete(comment_id) {
    instance
      .delete(`/api/comments/${comment_id}`)
      .then(() => {
        setComments((previous) =>
          previous.filter((comment) => comment.comment_id !== comment_id)
        );
        if (onDecrementCommentCount) onDecrementCommentCount();
      })
      .catch((err) => {
        console.log("Failed to delete comment", err);
      });
  }

  if (error) return <p>Error loading comments</p>;
  if (isLoading) return <p>Loading comments...</p>;

  function handleNewCommentOptimisticSuccess(newComment) {
    setComments((previousComments) => [newComment, ...previousComments]);
    if (onIncrementCommentCount) onIncrementCommentCount();
  }

  function handleNewCommentReplace(tempComment, realComment) {
    setComments((previousComments) =>
      previousComments.map((comment) =>
        comment.temporary_id === tempComment.temporary_id
          ? realComment
          : comment
      )
    );
  }

  function handleNewCommentOptimisticFail(temporary_id) {
    setComments((previousComments) =>
      previousComments.filter(
        (comment) => comment.temporary_id !== temporary_id
      )
    );
  }

  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment) => {
          const isAuthor = user?.username === comment.author;

          return (
            <li key={comment.comment_id} className="comment">
              <p>
                <strong>{comment.author}</strong>
              </p>
              <p>{comment.body}</p>
              <p>{new Date(comment.created_at).toLocaleString()}</p>

              {isAuthor && (
                <button onClick={() => handleDelete(comment.comment_id)}>
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <PostComment
        article_id={article_id}
        user={user}
        onOptimisticCommentSuccess={handleNewCommentOptimisticSuccess}
        onReplaceComment={handleNewCommentReplace}
        onOptimisticCommentFail={handleNewCommentOptimisticFail}
      />
    </div>
  );
}

export default Comments;
