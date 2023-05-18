import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import InternList from "./pages/intern/internList";
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
]);
