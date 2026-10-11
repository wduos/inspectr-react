import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Inbound from "./pages/Inbound/Inbound";
import ListSKU from "./pages/Outbound/Outbound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inbound" element={<Inbound />} />
        <Route path="/outbound" element={<ListSKU />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
