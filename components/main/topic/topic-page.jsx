import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useArticles from "../../../custom-hooks/use-articles";

function TopicPage() {
  const { topicName } = useParams();
  const { articles: allArticles, error, isLoading } = useArticles();
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    if (allArticles && topicName) {
      const matchingArticles = allArticles.filter(
        (article) => article.topic === topicName
      );
      setFilteredArticles(matchingArticles);
    }
  }, [allArticles, topicName]);

  return (
    <div>
      <h2>Articles for "{topicName}"</h2>
      <ul>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))
        ) : (
          <p>No articles found for this topic.</p>
        )}
      </ul>
    </div>
  );
}

export default TopicPage;
