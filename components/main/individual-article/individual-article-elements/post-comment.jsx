import { useState } from "react";
import instance from "../../../../api/api";

function PostComment({
  article_id,
  onOptimisticCommentSuccess,
  onOptimisticCommentFail,
}) {
  const [commentBody, setCommentBody] = useState("");
  const [commentUser, setCommentUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const temporary_id = Date.now();
    const optimisticComment = {
      temporary_id,
      author: commentUser,
      body: commentBody,
      created_at: new Date().toISOString(),
    };

    if (onOptimisticCommentSuccess)
      onOptimisticCommentSuccess(optimisticComment);

    setCommentBody("");
    setCommentUser("");

    instance
      .post(`/api/articles/${article_id}/comments`, {
        username: commentUser,
        body: commentBody,
      })
      .then((result) => {
        setSuccessMessage("Comment posted!");
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (onOptimisticCommentFail) onOptimisticCommentFail(temporary_id);
        setError("Something went wrong. Please try again")
        setLoading(false);
      });
  };

  return (
    <div className="post-comment">
      <h4>Post a Comment</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your username"
          value={commentUser}
          onChange={(event) => setCommentUser(event.target.value)}
          required
        />
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
