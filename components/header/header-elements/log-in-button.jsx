import { Link } from "react-router-dom";

function LogInButton() {
  return (
    <Link to={`login`} className="log-in-button">
      <strong>LOG IN</strong>
    </Link>
  );
}

export default LogInButton;
