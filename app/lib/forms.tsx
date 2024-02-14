"use server";

import { revalidatePath } from "next/cache";
import { changePassword, getUserWithEmail, getUserWithId } from "./pretend-db";
import { getPasswordResetToken } from "./utils";

export async function logIn(
  previousState: { message: string },
  formData: FormData
) {
  const email = formData.get("email")?.toString() || "";
  const pw = formData.get("password")?.toString() || "";
  const user = await getUserWithEmail(email);

  if (user) {
    if (pw == user.password) {
      return { message: "Login successful!" };
    }
  }
  return { message: "Login failed!" };
}
export async function forgotPassword(
  previousState: { message: string },
  formData: FormData
) {
  const email = formData.get("email")?.toString() || "";
  const user = await getUserWithEmail(email);
  if (!user) {
    // In an actual application, we DON'T want to give this information
    // away. Instead, just return as if the form submitted successfully.
    return { message: "User not in DB!" };
  }

  // This is where reset logic happens
  const token = await getPasswordResetToken(user);

  // This link will be active for 1 hour and will expire when used once
  const passwordResetLink = `http://localhost:3000/reset/${token}/${user.id}`;
  console.log(passwordResetLink);
  return { message: "Link will appear in terminal window!" };
}

export async function changePasswordFormSubmit(
  previousState: { message: string },
  formData: FormData
) {
  const unsuccessfulMessage = { message: "Something went terribly wrong!" };
  const pw = formData.get("newPassword")?.toString() || "";
  const retypedPw = formData.get("retypeNewPassword")?.toString() || "";
  const id = formData.get("id")?.toString() || "";
  const user = await getUserWithId(id);

  if (!user) {
    return unsuccessfulMessage;
  }
  if (pw != retypedPw) {
    return { message: "Passwords must match!" };
  }

  try {
    if (!changePassword(user?.id, pw)) {
      return unsuccessfulMessage;
    }
  } catch (e) {
    return unsuccessfulMessage;
  }
  revalidatePath("/reset/[token]/[user]", "page");
  return { message: "Password changed successfully!" };
}
