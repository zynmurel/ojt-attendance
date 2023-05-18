import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";

export default createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout/>,
  },
]);