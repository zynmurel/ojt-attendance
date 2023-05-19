import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import InternList from "./pages/intern/internList";
import AddIntern from "./pages/addIntern";
import Login from "./pages/login";
import Internlogs from "./pages/internlogs";
import { ProtectedLayout } from "./utils/routeGuard";

export default createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            path: "/admin",
            children: [{ path: "/admin/add-intern", element: <AddIntern /> }],
          },
          {
            path: "/intern",
            children: [
              {
                path: "/intern/intern-list",
                element: <InternList />,
              },
              {
                path: "/intern/intern-logs",
                element: <Internlogs />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
