import { useState } from "react";
import instance from "../../../../api/api";

function Votes({ article_id, initialVotes }) {
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  function handleVote(change) {
    if (hasVoted) return;

    setVotes((previousVotes) => previousVotes + change);
    setError(null);
    setHasVoted(true);

    instance
      .patch(`/api/articles/${article_id}`, { inc_votes: change })
      .catch((err) => {
        setVotes((previousVotes) => previousVotes - change);
        setError("Something went wrong. Please try again.");
        setHasVoted(false);
      });
  }

  return (
    <div className="votes-section">
      <p>
        <strong>Votes:</strong>
        {votes}
      </p>
      <button onClick={() => handleVote(1)} disabled={hasVoted}>
        Like
      </button>
      <button onClick={() => handleVote(-1)} disabled={hasVoted}>
        Dislike
      </button>
      {hasVoted ? <p>Thanks for voting!</p> : null}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Votes;
