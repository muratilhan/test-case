import logo from "./logo.svg";
import "./App.css";
import CustomTable from "./components/CustomTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <h1 className="text-3xl font-bold underline p-4">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/orders" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </h1>
  );
}

export default App;
