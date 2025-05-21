import { useState, useEffect } from "react";
import instance from "../api/api";

function useArticle(article_id) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    instance(`/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load article");
        setIsLoading(false);
      });
  }, [article_id]);

  return { article, error, isLoading };
}

export default useArticle;
