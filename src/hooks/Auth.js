import { createContext, useContext, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("user_role");
  const internId = localStorage.getItem("intern_id");
  const userName = localStorage.getItem("user_name");
  const userProfile = localStorage.getItem("user_profile");
  // call this function to set user token and set data to local storage
  const login = (token) => {
    localStorage.setItem(
      "token",
      process.env.REACT_APP_OJT_ATTENDANCE_PASSWORD
    );
    localStorage.setItem("user_role", token.role);
    localStorage.setItem("intern_id", token.id);
    localStorage.setItem("user_name", `${token.first_name} ${token.last_name}`);
    localStorage.setItem("user_profile", token.profile_pic);
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
    userName,
    userProfile,
  }));
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
