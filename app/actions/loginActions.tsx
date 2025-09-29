"use server"

import { signIn, signOut } from "@/auth"
import { redirect } from "next/navigation";

export async function socialLogin(provider: string) {
  await signIn(provider, { redirectTo: "/" })
}

export async function socialLogout() {
  await signOut({ redirectTo: "/" })
}
