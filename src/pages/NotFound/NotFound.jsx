import "./NotFound.css";
import { Link } from "react-router-dom";
import inspectrLogo from "../../assets/graphics/favicon-v2.svg";

export default function NotFound() {
  return (
    <div className="NotFound">
      <img src={inspectrLogo} alt="Logomarca Inspectr" />
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link className="link" to="/">
        <small>Voltar para o Início</small>
      </Link>
    </div>
  );
}
