import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login/login"
import { Mainscreen } from "../Pages/MainScreen/mainscreen";

export function Router() {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainscreen" element={<Mainscreen />} />
      </Routes>
    );
  }