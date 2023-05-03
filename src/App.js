import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Result from "./pages/Result";
import "./App.css";
import GameLayout from "./layouts/GameLayout";
import PanelLayout from "./layouts/PanelLayout";
import Panel from "./pages/Panel";
import AgregarProblema from "./pages/Panel/AgregarProblema";
import AgregarCategoria from "./pages/Panel/AgregarCategoria";

const App = () => {
  let router = useRoutes([
    {
      path: '/',
      element: <GameLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/room/:id", 
          element: <Room /> 
        },
        {
          path: "/result",
          element: <Result />
        }
      ]
    },
    {
      path: '/panel',
      element: <PanelLayout />,
      children: [
        {
          path: '/panel',
          element: <Panel />
        },
        {
          path: 'agregar-problema',
          element: <AgregarProblema />
        },
        {
          path: 'agregar-categoria',
          element: <AgregarCategoria />
        }
      ]
    }
  ])
  return router
};

export default App;
