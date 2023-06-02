import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../screens/Login";
import Chat from "../screens/Chat";

export default function AllRoutes() {
  const Location = useLocation();

  return (
    <React.Fragment>
      <Routes location={Location} key={Location.pathname}>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/chat" element={<Chat />}></Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
}
