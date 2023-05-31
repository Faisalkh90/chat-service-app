import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../screens/Login";

export default function AllRoutes() {
  const Location = useLocation();

  return (
    <React.Fragment>
      <Routes location={Location} key={Location.pathname}>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}></Route>
      </Routes>
    </React.Fragment>
  );
}
