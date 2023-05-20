import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/dashboardLayout";
import Login from "./pages/login";

// pages for admin
import CurrentIntern from "./pages/admin/currentIntern";
import AddIntern from "./pages/admin/addIntern";
import InternList from "./pages/admin/internList";

//pages for intern
import InternCamLogs from "./pages/intern/internCamLogs";
import Internlogs from "./pages/intern/internlogs";

//pages for utilities
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
