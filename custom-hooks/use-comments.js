import { useState, useEffect } from "react";
import instance from "../api/api";

function useComments(article_id) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [triggerRefetch, setTriggerRefetch] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    instance(`/api/articles/${article_id}/comments`)
      .then((response) => {
        setComments(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load comments");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  function refetch() {
    setTriggerRefetch((prev) => prev + 1);
  }

  return { comments, setComments, error, isLoading };
}

export default useComments;
