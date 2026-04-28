import { Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Play from "routes/Play";
import Footer from "components/Footer";
import Watch from "routes/Watch";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:id" element={<Play />} />
        <Route path="/play/:id/:episode_id" element={<Watch />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
