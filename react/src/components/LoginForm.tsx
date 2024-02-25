import { useAppDispatch } from "../store/app";
import { login } from "../features/user";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const userid = String(e.currentTarget.userid.value);
    const password = String(e.currentTarget.password.value);
    dispatch(login({ userid, password }));
    navigate("/");
  };
  return (
    <div className="shadow px-4 py-4 divide-y-2 rounded w-full">
      <h1 className="font-bold text-xl py-2 ">Log In</h1>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col py-2 gap-y-1">
          <label htmlFor="userid">Enter User Id:</label>
          <input type="text" name="userid" className="border px-2 py-1" />
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <label htmlFor="password">Enter Password</label>
          <input type="password" name="password" className="border px-2 py-1" />
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <button type="submit" className="bg-black text-white py-1 rounded">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
