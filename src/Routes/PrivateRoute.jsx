import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function PrivateRoute() {
  const access_token = useAppSelector((s) => s.login.access_token);
  return access_token ? <Outlet /> : <Navigate to="/login" replace />;
}
