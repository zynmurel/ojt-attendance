import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import InternList from "./pages/intern/internList";
import Login from "./pages/login";

export default createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/intern/internlist/",
        element: <InternList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
