import { Routes, Route } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";

import About from "./components/pages/About"
import Tables from "./components/pages/Tables"

function App() {
  return (
    <main>
      <Navigation />
      <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="about" element={<About />} />
      </Routes>
    </main>
  );
}

export default App;
