import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLoL from "./pages/lol/HomeLoL";
import Summoner from "./pages/lol/Summoners";
import Home from "./pages/inde";
import HomeTFT from "./pages/tft/HomeTFT";
import HomeValorant from "./pages/valorant/HomeValorant";
import Strategist from "./pages/tft/Strategist";
import Agent from "./pages/valorant/Agent";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-primary-darkblue text-secondary-text font-inter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lol" element={<HomeLoL />} />
          <Route path="/tft" element={<HomeTFT />} />
          <Route path="/valorant" element={<HomeValorant />} />
          <Route path="/summoner/:name/:tag" element={<Summoner />} />
          <Route path="/strategist/:name/:tag" element={<Strategist />} />
          <Route path="/agent/:name/:tag" element={<Agent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
