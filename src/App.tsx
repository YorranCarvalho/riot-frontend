import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Summoner from "./pages/Summoners";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-primary-darkblue text-secondary-text font-inter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summoner/:name/:tag" element={<Summoner />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
