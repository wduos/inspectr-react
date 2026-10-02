import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import CompareSKU from "./pages/CompareSKU/CompareSKU";
import ListSKU from "./pages/ListSKU/ListSKU";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/compare-sku" element={<CompareSKU />} />
        <Route path="/list-sku" element={<ListSKU />} />
      </Routes>
    </>
  );
}
