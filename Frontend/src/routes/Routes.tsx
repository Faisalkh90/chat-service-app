import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../screens/Login";
import Dashboard from "../screens/Chat";
import ChatRoom from "../screens/Chatroom";
import Header from "../components/Header";

export default function AllRoutes() {
  const Location = useLocation();

  return (
    <React.Fragment>
      <Routes location={Location} key={Location.pathname}>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/chatroom" element={<ChatRoom />}></Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
}
