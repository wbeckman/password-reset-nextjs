"use client";

import { useFormState } from "react-dom";
import { logIn } from "../lib/forms";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const initialState = { message: "" };
  const [state, dispatch] = useFormState(logIn, initialState);
  const searchParams = useSearchParams();
  const redirectedFromPwChange =
    searchParams.get("passwordChangeSuccess") == "true";
  const [popupViewable, setPopupViewable] = useState(true);

  return (
    <div>
      {redirectedFromPwChange && popupViewable && (
        <Suspense>
          <p onClick={() => setPopupViewable(false)} className="text-green-600">
            Password changed successfully! <br />
            (click to dismiss)
          </p>
        </Suspense>
      )}
      <form action={dispatch}>
        <div className="flex-col">
          <div>
            <label htmlFor="email">Email address</label>
          </div>
          <div>
            <input id="email" name="email" type="email" />
          </div>
        </div>

        <div className="mt-2">
          <div>
            <label htmlFor="email">Password</label>
          </div>
          <div>
            <input id="password" name="password" type="password" />
          </div>
        </div>
        <div className="flex">
          <button
            className="mt-2 bg-blue-400 rounded-md border-2 border-blue-600 mx-auto w-full"
            type="submit"
          >
            Enter
          </button>
        </div>
        <div className="mt-3">
          <Link className=" text-blue-700" href="/forgot">
            Forgot password?
          </Link>
        </div>
      </form>
      <p
        className={`text-${
          state.message.includes("successful") ? "green" : "red"
        }-600 my-auto`}
      >
        {state.message}
      </p>
    </div>
  );
}
