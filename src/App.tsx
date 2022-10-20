import React, { useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/Enterence/LoginForm";
import RegisterForm from "./components/Enterence/RegisterForm";
import { BrowserRouter, Route, Link, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BoardProvider } from "./contexts/BoardContext/BoardContext";
import {useBoardContext} from "./contexts/BoardContext/BoardContext"
import { useLoginContext } from "./contexts/LoginContext/LoginContext";
import ScrumBoard from "./components/MainBoard/ScrumBoard";
import BoardPage from "./pages/BoardPage"
import Layout from "./pages/Layout";
import { board } from "./services/http/patika/endpoints/board";

function App() {
  const { isLoggedIn } = useLoginContext();
  const { setState, state } = useBoardContext();

  return (
    <div className="App">
    {!isLoggedIn ? (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    ) : (
      <BoardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/board/:id" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </BoardProvider>
    )}
  </div>
  );
}

export default App;
