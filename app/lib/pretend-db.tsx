"use server";

/*
Pretending we have a database - saving us trouble of actually
setting one up ourselves. 
*/

import { User } from "@/app/lib/schemas";
import { unstable_noStore } from "next/cache";

const users = [
  {
    email: "will@willbeckman.com",
    password: "Cheese123@",
    id: "1",
    createdAt: new Date("January 1, 2024 00:00:00"),
  },
  {
    email: "bill@willbeckman.com",
    password: "@Chocolate321",
    id: "2",
    createdAt: new Date("February 1, 2024 00:00:00"),
  },
];

export async function getUserWithEmail(
  email: string
): Promise<User | undefined> {
  const filteredUsers = users.filter((user) => user.email === email);
  return filteredUsers.length > 0 ? filteredUsers[0] : undefined;
}

export async function getUserWithId(id: string): Promise<User | undefined> {
  unstable_noStore();
  const filteredUsers = users.filter((user) => user.id === id);
  return filteredUsers.length > 0 ? filteredUsers[0] : undefined;
}

export async function changePassword(
  id: string,
  newPassword: string
): Promise<boolean> {
  try {
    const filteredUsers = users.filter((user) => user.id === id);
    filteredUsers[0].password = newPassword;
  } catch {
    return false;
  }

  return true;
}
