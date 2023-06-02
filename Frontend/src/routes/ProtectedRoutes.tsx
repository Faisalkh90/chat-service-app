import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoutes() {
  const { userInfo } = useSelector((state: any) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/" />;
}
