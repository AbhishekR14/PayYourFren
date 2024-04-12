import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "../pages/signup.jsx";
import Signin from "../pages/signin.jsx";
import { SendMoney } from "../pages/SendMoney.jsx";
import Dashboard from "../pages/dashboard.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/PayYourFren/"}>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
