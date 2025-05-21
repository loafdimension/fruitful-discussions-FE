import { useState, useEffect } from "react";
import instance from "../api/api";

function useComments(article_id) {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    instance(`/api/articles/${article_id}/comments`)
      .then((response) => {
        setComments(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load comments");
        setIsLoading(false);
      });
  }, [article_id]);

  return { comments, error, isLoading };
}

export default useComments;
