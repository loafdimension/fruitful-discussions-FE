import { useState, useEffect } from "react";
import instance from "../api/api";

function useComments(article_id) {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    instance(`/api/articles/${article_id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [article_id]);

  return { comments, error };
}

export default useComments;
