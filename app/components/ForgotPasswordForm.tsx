"use client";

import { useFormState } from "react-dom";
import { forgotPassword } from "../lib/forms";

export default function LoginForm() {
  const initialState = { message: "" };

  const [state, dispatch] = useFormState(forgotPassword, initialState);
  return (
    <div>
      <div className="flex">
        <h2 className="text-xl mx-auto">Forgot password?</h2>
      </div>
      <div className="flex">
        <p className="mx-auto">We'll send you an email to recover it.</p>
      </div>
      <div className="flex">
        <form className="mx-auto mt-4" action={dispatch}>
          <div>
            <div>
              <label htmlFor="email">Email address</label>
            </div>
            <div>
              <input id="email" name="email" type="email" />
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
        </form>
      </div>
      <div className="flex">
        <p
          className={`mt-5 text-${
            state.message.includes("Check") ? "green" : "red"
          }-600 mx-auto`}
        >
          {state.message}
        </p>
      </div>
    </div>
  );
}
