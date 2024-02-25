import CatSvg from "../assets/cat.svg";
import { resetToken } from "../features/user";
import { useAppDispatch, useAppSelector } from "../store/app";

export default function Title() {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(resetToken());
  };
  return (
    <div className="shadow">
      <div className="max-w-4xl mx-auto py-2 flex gap-x-4 items-center justify-between">
        <div className=""></div>
        <div className="flex gap-x-2 ">
          <img src={CatSvg} alt="Cat" className="h-8" />
          <h1 className="font-black text-center md:text-2xl  text-xl">
            The Cat Cards
          </h1>{" "}
        </div>
        {isAuth ? (
          <button
            className="bg-red-800 text-white py-1 px-2 rounded text-xs md:text-base"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
}
