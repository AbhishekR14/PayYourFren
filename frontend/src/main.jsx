import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "../pages/signup.jsx";
import Signin from "../pages/signin.jsx";
import Send from "../pages/send.jsx";
import App from "./App.jsx";
import Dashboard from "../pages/dashboard.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/send" element={<Send />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
