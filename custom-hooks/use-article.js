import { useState, useEffect } from "react";
import instance from "../api/api";

function useArticle(article_id) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    instance(`/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [article_id]);

  return { article, error };
}

export default useArticle;
