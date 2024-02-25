import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import Title from "../components/Title";
import { useAppSelector, useAppDispatch } from "../store/app";
import { resetToken } from "../features/user";

export default function Auth() {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(resetToken());
  };
  return (
    <div>
      <Title />
      <div className="h-10"></div>
      {/* card wrapper divs */}
      <div className="mx-auto max-w-4xl">
        <div className="py-2">
          {isAuth ? "You're Already Authenticated ✅" : null}
        </div>
        <div className="py-4">
          <Link to="/" className="text-blue-500 underline">
            Home
          </Link>
        </div>
        {isAuth ? (
          <button
            className="bg-red-800 text-white py-1 rounded"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        ) : (
          <div className="flex md:flex-row flex-col gap-x-4 gap-y-4">
            <LoginForm />
            <SignUpForm />
          </div>
        )}
      </div>
      <div className="md:h-24 h-10"></div>
    </div>
  );
}
