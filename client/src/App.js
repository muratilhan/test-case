import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import { AuthContext } from "./context/AuthContext";

function App() {
  const context = useContext(AuthContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const foundUser = JSON.parse(user);
      context.setUser(foundUser);
    }
  }, []);
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <Routes className="routes">
          <Route path="/" element={<ChatBox />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
