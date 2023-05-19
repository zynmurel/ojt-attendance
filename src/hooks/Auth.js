import { createContext, useContext, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("user_role");
  const internId = localStorage.getItem("intern_id");
  // call this function to set user token and set data to local storage
  const login = (token) => {
    localStorage.setItem("token", token.id);
    localStorage.setItem("user_role", token.role);
    localStorage.setItem("intern_id", token.intern_id);
    window.location = "/";
  };
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };
  const value = useMemo(() => ({
    login,
    logout,
    userToken,
    userRole,
    internId,
  }));
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
