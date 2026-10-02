import { Link } from "react-router-dom";
import "./HomeButton.css";

export default function HomeButton({ title, icon, description, url }) {
  return (
    <Link className="HomeButton" to={url}>
      <div>
        {icon}
        {title}
      </div>
      <small>{description}</small>
    </Link>
  );
}
