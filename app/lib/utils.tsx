"use server";

import { SignJWT } from "jose";
import { User } from "@/app/lib/schemas";
import { revalidatePath } from "next/cache";

export async function getUserResetSecret(user: User) {
  return user.password + user.createdAt.toString();
}

export async function getPasswordResetToken(user: User) {
  // Sign password reset with their old PW + user creation time.
  // This forces it to be a one-time sign-in link, as the link will
  // break if the user tries to use it again after they update their PW.
  const secret = await getUserResetSecret(user);
  console.log(`Signing JWT with password: ${user.password}`);
  console.log(`${JSON.stringify(user)}`);
  const userToken = new SignJWT({
    id: user.id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(secret));
  return userToken;
}
