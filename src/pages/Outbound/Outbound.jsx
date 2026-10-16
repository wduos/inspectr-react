import "./Outbound.css";
import { useState, useRef, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useFx } from "../../Hooks/useFx/useFx";

export default function Outbound() {
  const [input, setInput] = useState("");
  const [sku, setSku] = useState("");
  const [skuList, setSkuList] = useState([]);
  const [usePrefix, setUsePrefix] = useState(true);
  const [showFinalizePrompt, setShowFinalizePrompt] = useState(false);

  const { play } = useFx();

  const inputRef = useRef(null);

  useEffect(() => {
    play("inspection-init");
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [usePrefix]);

  useEffect(() => {
    if (sku) {
      window.history.pushState({ conferenceActive: true }, "");

      const handlePopState = () => {
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
      play("warning");

      return;
    }

    const skuPattern = usePrefix ? /^24010[0-9]{6}$/ : /^10[0-9]{6}$/;
    if (!skuPattern.test(input)) {
      setInput("");

      play("warning");

      return;
    }

    setSkuList(...skuList, {
      sku: input,
      qty: 1,
    });

    console.log(sku);

    setInput("");

    play("success");
  }

  function resetConference() {
    setShowFinalizePrompt(false);
    setUsePrefix(true);
    setInput("");
    setSku("");

    play("inspection-end");

    inputRef.current?.focus();
    window.history.back();
  }

  return (
    <div className="Outbound">
      <Header
        titleTop="Conferência de"
        titleBottom="Outbound"
        backToUrl="/"
        onBack={sku ? () => setShowFinalizePrompt(true) : undefined}
      />

      <div>
        <h1 className="page-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64l3.3 0c10.4 36.9 44.4 64 84.7 64s74.2-27.1 84.7-64l102.6 0c10.4 36.9 44.4 64 84.7 64s74.2-27.1 84.7-64l3.3 0c35.3 0 64-28.7 64-64l0-146.7c0-17-6.7-33.3-18.7-45.3L512 146.7c-12-12-28.3-18.7-45.3-18.7l-50.7 0 0-32c0-35.3-28.7-64-64-64L64 32zM512 237.3l0 50.7-96 0 0-96 50.7 0 45.3 45.3zM152 384a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm232 40a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM305 225l-72 72c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-102.1 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l102.1 0-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9z" />
          </svg>
          {skuList.length > 0 ? "Em conferência" : "Nova Conferência"}
        </h1>
        {skuList.length > 0 ? (
          <p className="page-instructions">
            Siga escaneando o <span className="bold">SKU</span> das caixas no
            pallet. Elas serão listadas abaixo.
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
            inputMode="none"
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
            {/*<div className="title-data-wrapper">
              <h4>SKU</h4>

              {skuList.map((sku, index) => {
                <h3 key={index}>{sku.sku}</h3>;
              })}
            </div>
            <div className="title-data-wrapper">
              <h4>Caixas</h4>

              {skuList.map((sku, index) => {
                <h3 key={index}>{sku.qty}</h3>;
              })}
            </div> */}
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
