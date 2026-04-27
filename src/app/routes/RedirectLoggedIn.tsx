import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const RedirectLoggedIn = () => {
  const token = Cookies.get("token");

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
