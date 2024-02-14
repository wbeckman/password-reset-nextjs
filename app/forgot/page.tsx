"use server";

import ForgotPasswordForm from "@/app/components/ForgotPasswordForm";

export default async function ForgotPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ForgotPasswordForm />
    </main>
  );
}
