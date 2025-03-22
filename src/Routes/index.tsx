import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import Home from "../Pages/Home";
import Letter from "../Pages/Letter/Letter";
import DayPalette from "../Pages/DayPalette/DayPalette";
import TimeQuestion from "../Pages/TimeQuestion/TimeQuestion";

function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/daypalette" element={<DayPalette />} />
        <Route path="/timequestion" element={<TimeQuestion />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
