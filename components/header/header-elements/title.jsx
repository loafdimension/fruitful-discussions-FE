import { Link } from "react-router-dom";

function Title() {
  return (
    <Link to={`/`} className="header-title">
      <h1>FRUITFUL DISCUSSIONS</h1>
    </Link>
  );
}

export default Title;
