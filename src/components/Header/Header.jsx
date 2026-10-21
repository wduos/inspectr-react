import logoInspectr from "../../assets/graphics/favicon-v2.svg";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({
  isHomePage,
  titleTop,
  titleBottom,
  backToUrl,
  onBack,
}) {
  const handleClick = (e) => {
    if (onBack) {
      e.preventDefault();
      onBack();
    }
  };

  const userMail = localStorage.getItem("userMail");
  const userName = userMail
    ? userMail
        .split("@")[0]
        .replace(/[0-9]+/g, "")
        .replace(/[._-]+/g, " ")
        .trim()
        .split(/\s+/)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ")
    : "";

  return (
    <header className="Header">
      {isHomePage ? (
        <div>
          <img className="header-logo" src={logoInspectr} alt="Logo Inspectr" />
          <h1>Inspectr</h1>
        </div>
      ) : (
        <div>
          {!isHomePage &&
            (onBack ? (
              <button type="button" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </button>
            ) : (
              <Link to={backToUrl}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </Link>
            ))}
          <img className="header-logo" src={logoInspectr} alt="Logo Inspectr" />
          <div>
            {titleTop && <h3>{titleTop}</h3>}
            {titleBottom && <h2>{titleBottom}</h2>}
          </div>
        </div>
      )}

      {userMail ? (
        <div className="user-info">
          <h2>{userName}</h2>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m16.499 22.486c-1.292.34-2.78.514-4.499.514s-3.207-.174-4.499-.514c.003-3.353 1.14-4.486 4.499-4.486s4.496 1.134 4.499 4.486zm-4.499-14.486c-1.589 0-2 .411-2 2s.411 2 2 2 2-.411 2-2-.411-2-2-2zm11 4c0 5.028-1.41 8.165-4.522 9.747-.22-3.965-2.243-5.747-6.478-5.747s-6.258 1.782-6.478 5.747c-3.111-1.582-4.522-4.72-4.522-9.747 0-7.71 3.29-11 11-11s11 3.29 11 11zm-7-2c0-2.691-1.309-4-4-4s-4 1.309-4 4 1.309 4 4 4 4-1.309 4-4z" />
          </svg>
        </div>
      ) : (
        <div>
          <Link to="/login">Entrar</Link>
        </div>
      )}
    </header>
  );
}
