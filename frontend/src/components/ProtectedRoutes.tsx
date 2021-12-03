import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "../helper/hooks";

const ProtectedRoutes = () => {
  const user = useAppSelector((state) => state.user);
  let location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
