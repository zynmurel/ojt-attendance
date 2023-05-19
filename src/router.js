import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import InternList from "./pages/intern/internList";
import AddIntern from "./pages/addIntern";
import Login from "./pages/login";
import CurrentIntern from "./pages/currentIntern";
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
              ,
            ],
          },
          {
            path: "/intern",
            children: [
              {
                path: "/intern/intern-list",
                element: <InternList />,
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
