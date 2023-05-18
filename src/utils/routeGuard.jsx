import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export const ProtectedLayout = () => {
  const { userToken } = useAuth();
  const outlet = useOutlet();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return <div>{outlet}</div>;
};
