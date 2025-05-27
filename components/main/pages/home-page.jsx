import "./home-page.css";
import ArticleCards from "../article-cards/article-cards";
import { useNavigate } from "react-router-dom";

function HomePage({ topics }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="topics-list">
        <h2>Topics</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic}>
              <button onClick={() => navigate(`/topics/${topic}`)}>
                {topic}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="articles-container">
        <ArticleCards />
      </div>
    </div>
  );
}

export default HomePage;
