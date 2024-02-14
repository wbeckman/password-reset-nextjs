import { getUserWithId } from "@/app/lib/pretend-db";
import { getUserResetSecret } from "@/app/lib/utils";
import { jwtVerify } from "jose";
import { notFound } from "next/navigation";
import ResetPasswordForm from "@/app/components/ResetPasswordForm";

export const revalidate = false;
export default async function Page({
  params,
}: {
  params: { token: string; user: string };
}) {
  const user = await getUserWithId(params.user);
  if (!user) {
    notFound();
  }
  const userResetSecret = await getUserResetSecret(user);

  // Password is outdated
  console.log(`Verifying JWT with password: ${user.password}`);
  console.log(`${JSON.stringify(user)}`);

  try {
    const decodedPayload = await jwtVerify(
      params.token,
      new TextEncoder().encode(userResetSecret)
    );
    if (!decodedPayload || decodedPayload.payload.id !== user.id) {
      notFound();
    }
  } catch (e: any) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ResetPasswordForm id={params.user} />
    </main>
  );
}
