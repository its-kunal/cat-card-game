import Leaderboard from "../components/Leaderboard";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/app";

export default function Home() {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return (
    <div>
      <Title />
      <div className="h-10"></div>
      {/* card wrapper divs */}
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-x-4 gap-y-4">
          <Leaderboard />
          <div className="flex gap-x-4 pt-4 justify-end">
            <Link to="/game">
              <button className="bg-black text-white py-1 px-2 rounded">
                Start Game
              </button>
            </Link>
            {isAuth ? (
              <> </>
            ) : (
              <Link to="/auth">
                <button className="bg-black text-white py-1 px-2 rounded">
                  Authenticate
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="md:h-24 h-10"></div>
    </div>
  );
}
