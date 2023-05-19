import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import AddIntern from "./pages/addIntern";
import Login from "./pages/login";
import CurrentIntern from "./pages/currentIntern";
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
            children: [
              { path: "/admin/add-intern", element: <AddIntern /> },
              ,
              {
                path: "/admin/currentintern", //Current Intern Component
                element: <CurrentIntern />,
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
