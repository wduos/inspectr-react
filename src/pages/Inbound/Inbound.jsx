import "./Inbound.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";

export default function Inbound() {
  const [input, setInput] = useState("");
  const [sku, setSku] = useState("");
  const [boxCounter, setBoxCounter] = useState(0);
  const [usePrefix, setUsePrefix] = useState(true);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [usePrefix]);

  function handleSetSKU(e) {
    let value = e.target.value.replace(/[^0-9]/g, "");

    const maxLength = usePrefix ? 11 : 8;
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    setInput(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!input) {
      setShowToast(true);
      setToastTitle("Erro");
      setToastDescription("Você precisa escanear uma SKU no campo acima.");
      setToastType("error");
      return;
    }

    const skuPattern = usePrefix ? /^24010[0-9]{6}$/ : /^10[0-9]{6}$/;
    if (!skuPattern.test(input)) {
      setShowToast(true);
      setToastTitle("Aviso");
      setToastDescription(
        "O dado escaneado não é uma SKU válida. Tente novamente.",
      );
      setToastType("warning");

      setInput("");
      return;
    }

    setShowToast(true);
    setToastTitle("Sucesso");
    setToastDescription(
      "Código de SKU válido! Conferência iniciada com a SKU " + input + ".",
    );
    setToastType("success");

    setInput("");
    setSku(input);
    setBoxCounter(boxCounter + 1);
  }

  return (
    <div className="Inbound">
      <Header titleTop="Conferência de" titleBottom="Inbound" backToUrl="/" />

      <div>
        <h1 className="page-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M284-1.3c-17.3-10-38.7-10-56 0L143.8 47.3c-17.3 10-28 28.5-28 48.5l0 101.9-88.3 51c-17.3 10-28 28.5-28 48.5l0 97.3c0 20 10.7 38.5 28 48.5l84.3 48.6c17.3 10 38.7 10 56 0l88.3-51 88.3 51c17.3 10 38.7 10 56 0L484.5 443c17.3-10 28-28.5 28-48.5l0-97.3c0-20-10.7-38.5-28-48.5l-88.3-51 0-101.9c0-20-10.7-38.5-28-48.5L284-1.3zM232 292.6l0 106.5-88.3 51c-1.2 .7-2.6 1.1-4 1.1l0-105.3 92.3-53.3zm231.4 .6c.7 1.2 1.1 2.6 1.1 4l0 97.3c0 2.9-1.5 5.5-4 6.9l-84.3 48.6c-1.2 .7-2.6 1.1-4 1.1l0-105.3 91.2-52.6zM348.3 95.8l0 101.9-92.3 53.3 0-106.5 91.2-52.6c.7 1.2 1.1 2.6 1.1 4z" />
          </svg>
          {sku ? "Em conferência" : "Nova Conferência"}
        </h1>
        {sku ? (
          <p className="page-instructions">
            Siga escaneando o <span className="bold">SKU</span> das caixas no
            pallet, e escute os avisos sonoros para identificar erros.
          </p>
        ) : (
          <p className="page-instructions">
            Escaneie a SKU de uma caixa do pallet para iniciar a conferência do
            pallet.
          </p>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
          {/*<input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleSetSKU(e)}
          inputMode="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
          placeholder={usePrefix ? "Ex.: 24010123456" : "Ex.: 10123456"}
          maxLength={usePrefix ? "11" : "8"}
        />*/}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleSetSKU(e)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            placeholder={usePrefix ? "Ex.: 24010123456" : "Ex.: 10123456"}
            maxLength={usePrefix ? "11" : "8"}
          />
        </form>

        {!sku && (
          <div
            className="switch-label-wrapper"
            style={{ marginBottom: "1rem" }}
          >
            <button
              className={usePrefix ? "switch-active" : ""}
              id="sku-prefix-switch"
              type="button"
              onClick={() => {
                setUsePrefix(!usePrefix);
                setInput("");
              }}
            ></button>
            <label htmlFor="sku-prefix-switch">Usar prefixo</label>
          </div>
        )}

        {sku && (
          <div className="important-data-wrapper">
            <div className="title-data-wrapper">
              <h4>SKU</h4>
              <h3>{sku}</h3>
            </div>
            <div className="title-data-wrapper">
              <h4>Caixas</h4>
              <h3>{boxCounter}</h3>
            </div>
          </div>
        )}

        <Toast
          title={toastTitle}
          description={toastDescription}
          type={toastType}
          show={showToast}
        />

        {/* <div className="bottom-btns-wrapper">
          <Link to="/">Voltar</Link>
        </div> */}
      </div>
    </div>
  );
}
