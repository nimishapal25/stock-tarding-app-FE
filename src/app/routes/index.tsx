import { Routes, Route } from "react-router-dom";
import { Login } from "../../features/auth/pages/Login";
import { CreateAccount } from "../../features/auth/pages/CreateAccount";
import { Dashboard } from "../../features/dashboard/pages/Dashboard";
import { ProtectedRoute } from "./protectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<RedirectLoggedIn />}> */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<CreateAccount />}></Route>
      {/* </Route> */}

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
};
