import React from "react";
import { signup } from "../features/user";
import { useAppDispatch } from "../store/app";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const userid = e.currentTarget.userid.value;
    const password = e.currentTarget.password.value;
    const cnfpass = e.currentTarget.cnfpass.value;
    console.log(password, cnfpass);
    if (password != cnfpass) alert("Password do not match");
    else dispatch(signup({ password, userid }));
    navigate("/");
  };

  return (
    <div className="shadow px-4 py-4 divide-y-2 rounded w-full">
      <h1 className="font-bold text-xl py-2 ">Sign Up</h1>
      <form action="" onSubmit={submitHandler}>
        <div className="flex flex-col py-2 gap-y-1">
          <label htmlFor="userid">Enter User Id:</label>
          <input type="text" name="userid" className="border px-2 py-1" />
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            name="password"
            className="border  px-2 py-1"
          />
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <label htmlFor="cnfpass">Renter Password</label>
          <input type="password" name="cnfpass" className="border  px-2 py-1" />
        </div>
        <div className="flex flex-col py-2 gap-y-1">
          <button type="submit" className="bg-black text-white py-1 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
