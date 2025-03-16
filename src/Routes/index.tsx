import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import Home from "../Pages/Home";
import Letter from "../Pages/Letter/Letter";
import DayPalette from "../Pages/DayPalette/DayPalette";

function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} /> {/* 정확히 "/" 일때만 Home 표시 */}
        <Route path="/letter" element={<Letter />} />
        <Route path="/daypalette" element={<DayPalette />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
