import { Link } from "react-router-dom";
import "./Notifications.css";

export default function Notifications({ title, icon, description, url }) {
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
