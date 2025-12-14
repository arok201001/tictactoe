import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "*",
    element: <div>Page not found</div>
  }
]);

export default router;