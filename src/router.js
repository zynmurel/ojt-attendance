import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import Login from "./pages/login";

export default createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
