import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import InternList from "./pages/intern/internList";
import AddIntern from "./pages/addIntern";
import Login from "./pages/login";
import Internlogs from "./pages/internlogs";
import { ProtectedLayout } from "./utils/routeGuard";
import { RoleGuardLayout } from "./utils/roleGuard";

export default createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: (
          <RoleGuardLayout>
            <DashboardLayout />
          </RoleGuardLayout>
        ),
        children: [
          {
            path: "/admin",
            children: [{ path: "/admin/add-intern", element: <AddIntern /> }],
          },

          {
            path: "/admin/intern-list",
            element: <InternList />,
          },
          {
            path: "/intern",
            children: [
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
