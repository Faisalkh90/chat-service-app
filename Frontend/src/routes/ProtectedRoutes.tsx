import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  return localStorage.getItem("userInfo") ? <Outlet /> : <Navigate to="/" />;
}
