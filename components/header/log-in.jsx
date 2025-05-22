import { useState } from "react";

function LogIn({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const hardcodedUser = {
      username: "grumpy19",
      password: "grumpy19",
    };

    if (
      username === hardcodedUser.username &&
      password === hardcodedUser.password
    ) {
      onLogin(hardcodedUser);
      setError("");
    } else {
      setError("Inavlid username or password");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Log In</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default LogIn;
