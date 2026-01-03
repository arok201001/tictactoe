import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import authRouter from "../src/routes/AuthRouter"
import appRouter from "../src/routes/AppRouter"

export default function App() {
  const { user } = useContext(AuthContext);

  return <RouterProvider router={user ? authRouter : appRouter} />

}
