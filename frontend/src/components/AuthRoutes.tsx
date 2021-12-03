import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../helper/hooks";

const AuthRoutes = () => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default AuthRoutes;
