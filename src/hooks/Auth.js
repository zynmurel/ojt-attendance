import { createContext, useContext, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const value = useMemo(() => ({
    name: "sean",
  }));
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
