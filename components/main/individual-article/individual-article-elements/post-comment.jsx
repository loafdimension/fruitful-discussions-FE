import { useState } from "react";
import instance from "../../../../api/api";

function PostComment({
  article_id,
  user,
  onOptimisticCommentSuccess,
  onOptimisticCommentFail,
  onReplaceComment,
}) {
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user || !user.username) {
      setError("You must be logged in to post a comment.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const temporary_id = Date.now();
    const optimisticComment = {
      temporary_id,
      author: user.username, 
      body: commentBody,
      created_at: new Date().toISOString(),
    };

    if (onOptimisticCommentSuccess)
      onOptimisticCommentSuccess(optimisticComment);

    setCommentBody("");

    instance
      .post(`/api/articles/${article_id}/comments`, {
        username: user.username, // use user.username here
        body: commentBody,
      })
      .then((result) => {
        setSuccessMessage("Comment posted!");
        setError(null);
        setLoading(false);

        if (onReplaceComment) {
          onReplaceComment(optimisticComment, result.data);
        }
      })
      .catch((err) => {
        if (onOptimisticCommentFail) onOptimisticCommentFail(temporary_id);
        setError("Something went wrong. Please try again");
        setLoading(false);
      });
  };

  return (
    <div className="post-comment">
      <h4>Post a Comment</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your comment here..."
          value={commentBody}
          onChange={(event) => setCommentBody(event.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default PostComment;
