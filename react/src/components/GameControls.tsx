import { useAppDispatch } from "../store/app";
import { popCard, resetGame } from "../features/game";
import { Link } from "react-router-dom";

export default function GameControls() {
  const buttonCSS = "bg-black text-white py-1 rounded px-2";
  const dispatch = useAppDispatch();
  const resetHandler = () => {
    dispatch(resetGame());
  };
  const popCardHandler = () => {
    dispatch(popCard());
  };
  return (
    <>
      <div className="mx-auto flex gap-x-4 flex-wrap gap-y-4 justify-center">
        <button className={buttonCSS} onClick={resetHandler}>
          Reset Game
        </button>
        <button className={buttonCSS}>Start Game</button>
        <button className={buttonCSS} onClick={popCardHandler}>
          Pop Card
        </button>
      </div>
      <div className="h-10"></div>
      <div className="flex justify-center">
        <Link to="/"> Home</Link>
      </div>
    </>
  );
}
