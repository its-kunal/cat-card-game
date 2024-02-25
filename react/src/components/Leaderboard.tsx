import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/app";
import { getLeaderboard } from "../features/leaderboard";

export default function Leaderboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const inv = setInterval(() => {
      dispatch(getLeaderboard());
    }, 1000);
    return () => {
      clearInterval(inv);
    };
  }, []);
  const leaderboard = useAppSelector(
    (state) => state.leaderboard.leaderboard
  ) as [];
  // const leaderboard = [[]];
  return (
    <div className="divide-y-2">
      <h1 className="text-center text-2xl font-bold py-2">Leaderboard</h1>
      <div className="pt-4">
        <div className="grid grid-cols-12 bg-gray-50 border">
          <div className="col-span-2 border px-1 py-1 font-bold ">Rank</div>
          <div className="col-span-6 border px-1 py-1 font-bold">User Id</div>
          <div className="col-span-4 border px-1 py-1 font-bold">Score</div>
        </div>
        {leaderboard.map((v, idx) => {
          return (
            <Tile sno={idx + 1} userid={`${v[0]}`} score={v[1]} key={idx} />
          );
        })}
      </div>
    </div>
  );
}

function Tile({
  sno,
  userid,
  score,
}: {
  sno: number;
  userid: string;
  score: number;
}) {
  return (
    <div className="grid grid-cols-12 bg-gray-50 border">
      <div className="col-span-2 border px-2 py-1 ">{sno}</div>
      <div className="col-span-6 border px-2 py-1 truncate text-ellipsis">
        {userid}
      </div>
      <div className="col-span-4 border px-2 py-1">{score}</div>
    </div>
  );
}
