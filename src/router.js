import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import AddIntern from "./pages/addIntern";
import Login from "./pages/login";
import Internlogs from "./pages/internlogs";

export default createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/add-intern",
        element: <AddIntern />,
      },
      {
        path: "/intern-logs",
        element: <Internlogs />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
