import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <div>Page not found</div>,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
