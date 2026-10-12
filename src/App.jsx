import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Inbound from "./pages/Inbound/Inbound";
import ListSKU from "./pages/Outbound/Outbound";
import Synth from "./pages/Synth/Synth";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inbound" element={<Inbound />} />
        <Route path="/outbound" element={<ListSKU />} />
        <Route path="/synth" element={<Synth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
