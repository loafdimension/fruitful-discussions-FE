import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ArticleCards from "../components/main/article-cards/article-cards";
import IndividualArticle from "../components/main/individual-article/individual-article";
import LogIn from "../components/header/log-in";

function App() {
  const [user, setUser] = useState(null);
  const [showLogIn, setShowLogIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogIn(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <>
      <h1>Fruitful Discussions</h1>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <button onClick={() => setShowLogIn((previous) => !previous)}>
            {showLogIn ? "Close Login" : "Log In"}
          </button>
        )}
      </div>

      {showLogIn && !user && <LogIn onLogin={handleLogin} />}

      <Routes>
        <Route path="/" element={<ArticleCards />} />
        <Route path="/articles" element={<ArticleCards />} />
        <Route path="/home" element={<ArticleCards />} />
        <Route path="/articles/:article_id" element={<IndividualArticle user={user}/>} />
      </Routes>
    </>
  );
}

export default App;
