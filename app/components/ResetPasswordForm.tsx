"use client";

import { redirect } from "next/navigation";
import { changePasswordFormSubmit } from "../lib/forms";
import { useFormState } from "react-dom";

export default function ResetPasswordForm(props: { id: string }) {
  const initialState = { message: "" };
  const [state, dispatch] = useFormState(
    changePasswordFormSubmit,
    initialState
  );

  if (state.message.includes("successfully")) {
    redirect("/?passwordChangeSuccess=true");
  }

  return (
    <form action={dispatch}>
      <div className="flex-col">
        <input id="id" name="id" type="hidden" value={props.id} />
        <div>
          <label htmlFor="newPassword">New Password</label>
        </div>
        <div>
          <input id="newPassword" name="newPassword" type="password" />
        </div>
        <div>
          <label htmlFor="newPassword">Retype new password</label>
        </div>
        <div>
          <input
            id="retypeNewPassword"
            name="retypeNewPassword"
            type="password"
          />
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
      <div className="flex">
        <p
          className={`mt-5 text-${
            state.message.includes("Check") ? "green" : "red"
          }-600 mx-auto`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
