import { useState, useEffect } from "react";
import instance from "../api/api";

function useArticles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    instance(`/api/articles`)
      .then((response) => {
        setArticles(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles");
        setIsLoading(false);
      });
  }, []);

  return { articles, error, isLoading };
}

export default useArticles;
