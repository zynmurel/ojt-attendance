import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export const RoleGuardLayout = ({ children }) => {
  let location = useLocation();
  const { userRole } = useAuth();

  if (!location.pathname.includes(`/${userRole}`)) {
    return <Navigate to={`/${userRole}`} />;
  }

  return <div>{children}</div>;
};
