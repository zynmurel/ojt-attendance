import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import InternList from "./pages/admin/internList";
import AddIntern from "./pages/admin/addIntern";
import Login from "./pages/login";
import CurrentIntern from "./pages/admin/currentIntern";
import Internlogs from "./pages/intern/internlogs";
import { ProtectedLayout } from "./utils/routeGuard";
import { RoleGuardLayout } from "./utils/roleGuard";
import InternCamLogs from "./pages/intern/internCamLogs";

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
            children: [
              {
                path: "/admin", //Current Intern Component
                element: <CurrentIntern />,
              },
              { path: "/admin/add-intern", element: <AddIntern /> },
              {
                path: "/admin/list-of-intern",
                element: <InternList />,
              },
              ,
            ],
          },

          {
            path: "/admin/intern-list",
            element: <InternList />,
          },
          {
            path: "/intern",
            children: [
              {
                path: "/intern",
                element: <InternCamLogs />,
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
