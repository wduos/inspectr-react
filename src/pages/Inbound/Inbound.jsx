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
  const [showFinalizePrompt, setShowFinalizePrompt] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [usePrefix]);

  // 1. Manage history stack when 'sku' becomes active (conference started)
  useEffect(() => {
    if (sku) {
      // Push a fake state to the history stack so the back button stays on page
      window.history.pushState({ conferenceActive: true }, "");

      const handlePopState = (event) => {
        // Prevent default navigation and show prompt instead
        window.history.pushState({ conferenceActive: true }, "");
        setShowFinalizePrompt(true);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [sku]);

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
      setToasts(
        "Aviso",
        "Você precisa escanear uma SKU no campo acima.",
        "warning",
      );
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

    if (sku && input === sku) {
      setShowToast(true);
      setToastTitle("Compatível");
      setToastDescription(
        "A SKU desta caixa é a mesma da referência neste pallet! ",
      );
      setToastType("success");
      setInput("");
      setBoxCounter(boxCounter + 1);
      return;
    }

    if (sku && input !== sku) {
      setShowToast(true);
      setToastTitle("Incompatível");
      setToastDescription(
        "A SKU desta caixa é diferente da referência neste pallet. Verifique! ",
      );
      setToastType("error");
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

  function resetConference() {
    setShowFinalizePrompt(false);
    setBoxCounter(0);
    setShowToast(false);
    setUsePrefix(true);
    setInput("");
    setSku("");
    // 2. Step back out of our dummy history state so user actually leaves the screen
    window.history.back();
  }

  return (
    <div className="Inbound">
      <Header
        titleTop="Conferência de"
        titleBottom="Inbound"
        backToUrl="/"
        onBack={sku ? () => setShowFinalizePrompt(true) : undefined}
      />

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
          <input
            ref={inputRef}
            type="text"
            value={input}
            // inputMode="none"
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

        <Toast
          title={toastTitle}
          description={toastDescription}
          type={toastType}
          show={showToast}
        />

        {sku && (
          <div className="important-data-wrapper mtop">
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

        {sku && (
          <button
            className="button"
            type="button"
            onClick={() => setShowFinalizePrompt(true)}
          >
            Finalizar
          </button>
        )}

        <div className={showFinalizePrompt ? "prompt shown" : "prompt"}>
          {/* <div className="prompt shown"> */}
          <div
            className="prompt-mask"
            onClick={() => setShowFinalizePrompt(false)}
          ></div>
          <div
            className={
              showFinalizePrompt ? "prompt-wrapper shown" : "prompt-wrapper"
            }
          >
            <h3 className="page-title">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-336c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
              Confirma
            </h3>
            <p>Tem certeza que deseja finalizar a conferência?</p>
            <button className="button" type="button" onClick={resetConference}>
              Finalizar conferência
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
