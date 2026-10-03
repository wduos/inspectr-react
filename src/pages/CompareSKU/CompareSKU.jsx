import "./CompareSKU.css";
import { useState } from "react";

export default function CompareSKU() {
  const [usePrefix, setUsePrefix] = useState(true);

  return (
    <div className="CompareSKU">
      <h1 className="page-title">Nova Conferência</h1>
      <h2 className="page-subtitle">Compara SKU</h2>
      <p className="page-instructions">
        Escaneie a SKU de uma caixa do pallet para iniciar a conferência.
      </p>
      <input
        type="text"
        placeholder={usePrefix ? "(240)10221234" : "10221234"}
      />

      <div className="item-label-wrapper">
        <input
          type="checkbox"
          id="sku-prefix-switch"
          checked={usePrefix}
          onChange={() => setUsePrefix(!usePrefix)}
        />
        <label htmlFor="sku-prefix-switch">Usar prefixo (240)</label>
      </div>
    </div>
  );
}
