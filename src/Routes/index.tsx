import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import Home from "../Pages/Home";
import Letter from "../Pages/Letter/Letter";
import NameCard from "../Pages/NameCard/Letter";

function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/namecard" element={<NameCard />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
