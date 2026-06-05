import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar    from "./components/Navbar";
import Footer    from "./components/Footer";
import Home      from "./pages/Home";
import About     from "./pages/About";
import TopCoins  from "./pages/TopCoins";
import Countries from "./pages/Countries";
import Contact   from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/top-coins" element={<TopCoins />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/contact"   element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}