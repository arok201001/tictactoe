import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import Lobby from "../pages/LobbyPage";
import GamePage from "../pages/GamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
