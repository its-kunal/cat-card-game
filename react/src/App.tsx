import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { useAppSelector } from "./store/app";
import Loader from "./components/Loader";

const routes = [
  {
    link: "/auth",
    component: <Auth />,
  },
  { link: "/", component: <Home /> },
  { link: "/game", component: <Game /> },
];

export default function App() {
  const loading = useAppSelector((state) => state.user.loading);
  if (loading) return <Loader />;
  return (
    <Routes>
      {routes.map((v, idx) => {
        return <Route key={idx} element={v.component} path={v.link} />;
      })}
    </Routes>
  );
}
