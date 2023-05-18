import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboardLayout";
import AddIntern from "./pages/addIntern";
import Login from "./pages/login";

export default createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout/>,
    children: [
      {
        path: "/add-intern",
        element: <AddIntern/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
