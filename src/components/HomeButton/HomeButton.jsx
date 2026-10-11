import { Link } from "react-router-dom";
import "./HomeButton.css";

export default function HomeButton({
  titleTop,
  titleBottom,
  icon,
  description,
  url,
}) {
  return (
    <Link className="HomeButton" to={url}>
      <div>
        {icon}
        <div>
          <h3>{titleTop}</h3>
          <h2>{titleBottom}</h2>
        </div>
      </div>
      <small>{description}</small>
    </Link>
  );
}
