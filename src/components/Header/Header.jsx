import { supabase } from "../../lib/supabaseClient";
import logoInspectr from "../../assets/graphics/favicon-v2.svg";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";

export default function Header({ pageTitle, onBack, showLoginBtn = true }) {
  const [userMail, setUserMail] = useState("");
  const [showUserPopMenu, setShowUserPopMenu] = useState(false);
  const [awaitingSignOut, setAwaitingSignOut] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onBack) {
      e.preventDefault();
      onBack();
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const mail = localStorage.getItem("userMail");

    if (mail) {
      setUserMail(mail);
    }
  }, []);

  async function handleSignOut() {
    setAwaitingSignOut(true);

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }

    localStorage.removeItem("userMail");
    setUserMail("");
    setShowUserPopMenu(false);
    setAwaitingSignOut(false);
  }

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
      <div>
        {pageTitle === "Home" ? (
          <div className="header-logo-wrapper">
            <img
              className="header-logo"
              src={logoInspectr}
              alt="Logo Inspectr"
            />
          </div>
        ) : (
          <div>
            <button type="button" onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </button>
          </div>
        )}
        <div>
          <h1>Inspectr</h1>
          <h2>{pageTitle}</h2>
        </div>
      </div>

      {showUserPopMenu && (
        <div
          className="user-info-pop-menu-bg"
          onClick={() => setShowUserPopMenu(!showUserPopMenu)}
        ></div>
      )}

      {userMail ? (
        <div
          className="user-info"
          onClick={() => setShowUserPopMenu(!showUserPopMenu)}
        >
          <h2>{userName}</h2>
          <svg viewBox="0 0 24 24">
            <path d="m16,19v4.3c-1.253.445-2.596.7-4,.7s-2.747-.255-4-.7v-4.3c0-.552.449-1,1-1h6c.551,0,1,.448,1,1Zm-4-11c-1.103,0-2,.897-2,2s.897,2,2,2,2-.897,2-2-.897-2-2-2Zm6,14.376v-3.376c0-1.654-1.346-3-3-3h-6c-1.654,0-3,1.346-3,3v3.376C2.419,20.298,0,16.43,0,12,0,5.383,5.383,0,12,0s12,5.383,12,12c0,4.43-2.419,8.298-6,10.376Zm-2-12.376c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Z" />
          </svg>

          {showUserPopMenu && (
            <div className="user-info-pop-menu">
              <button type="button" onClick={handleSignOut}>
                Sair
                <svg viewBox="0 0 24 24">
                  <path d="m24,15c0,.617-.24,1.197-.678,1.634l-2.072,2.073c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l1.292-1.293h-6.128c-.553,0-1-.447-1-1s.447-1,1-1h6.128l-1.292-1.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.073,2.074c.437.436.677,1.016.677,1.633Zm-10-4v-5c0-1.103-.897-2-2-2h0s0,0,0,0v17.999h1c.552,0,1-.448,1-1v-2c0-.553.447-1,1-1s1,.447,1,1v2c0,1.654-1.346,3-3,3H3c-1.654,0-3-1.346-3-3V5.621C0,3.246,1.69,1.184,4.019.718L7.216.079c1.181-.236,2.391.066,3.321.829.375.307.665.685.902,1.092h.561c2.206,0,4,1.794,4,4v5c0,.553-.447,1-1,1s-1-.447-1-1Zm-5,1.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5,1.5.672,1.5,1.5,1.5,1.5-.672,1.5-1.5Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ) : (
        showLoginBtn && (
          <div>
            <Link to="/login" className="login-btn">
              Entrar
            </Link>
          </div>
        )
      )}
    </header>
  );
}
