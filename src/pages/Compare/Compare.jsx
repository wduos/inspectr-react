import "./Compare.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

export default function Compare() {
  const [sku, setSku] = useState("");
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

    setSku(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!sku) {
      setShowToast(true);
      setToastTitle("Erro");
      setToastDescription("É obrigatório inserir uma SKU no campo acima.");
      setToastType("error");
      return;
    }

    const skuPattern = usePrefix ? /^24010[0-9]{6}$/ : /^10[0-9]{6}$/;
    if (!skuPattern.test(sku)) {
      setShowToast(true);
      setToastTitle("Aviso");
      setToastDescription("Por favor, escaneie uma SKU válida.");
      setToastType("warning");
      return;
    }

    console.log(sku);
  }

  return (
    <div className="Compare">
      <h1 className="page-title">
        <svg viewBox="0 0 24 24">
          <path d="M18.581,2.14,12.316.051a1,1,0,0,0-.632,0L5.419,2.14A4.993,4.993,0,0,0,2,6.883V12c0,7.563,9.2,11.74,9.594,11.914a1,1,0,0,0,.812,0C12.8,23.74,22,19.563,22,12V6.883A4.993,4.993,0,0,0,18.581,2.14ZM16.718,9.717l-4.272,4.272a1.873,1.873,0,0,1-1.335.553h-.033a1.872,1.872,0,0,1-1.345-.6l-2.306-2.4A1,1,0,1,1,8.868,10.16L11.112,12.5,15.3,8.3a1,1,0,0,1,1.414,1.414Z" />
        </svg>
        Compara SKU
      </h1>
      <h2 className="page-subtitle">Nova Conferência</h2>
      <p className="page-instructions">
        Escaneie a SKU de uma caixa do pallet para iniciar a conferência.
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={inputRef}
          type="text"
          value={sku}
          onChange={(e) => handleSetSKU(e)}
          inputMode="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
          placeholder={usePrefix ? "Ex.: 24010123456" : "Ex.: 10123456"}
          maxLength={usePrefix ? "11" : "8"}
        />
      </form>

      <div className="switch-label-wrapper">
        <button
          className={usePrefix ? "switch-active" : ""}
          id="sku-prefix-switch"
          type="button"
          onClick={() => {
            setUsePrefix(!usePrefix);
            setSku("");
          }}
        ></button>
        <label htmlFor="sku-prefix-switch">Usar prefixo</label>
      </div>

      <div className="bottom-btns-wrapper">
        <Link to="/">Voltar</Link>
      </div>

      <Toast
        title={toastTitle}
        description={toastDescription}
        type={toastType}
        show={showToast}
      />
    </div>
  );
}
