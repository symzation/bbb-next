"use server"

import { signIn, signOut } from "@/auth"
//import { redirect } from "next/navigation"

export async function socialLogin(provider: string) {
  await signIn(provider, { redirectTo: '/' })
}

export async function socialLogout() {
  const result = await signOut({ redirectTo: '/' })
}

export async function credentialsLogin(formData: FormData) {
  const response = await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirect: false,
    //  csrfToken: formData.get("csrfToken") as string,
  })
  if (!response) {
    throw new Error("No response from signIn")
  }
  if (response?.error) {
    return { error: response.error }
  }

  return { success: true }
  
  /* const response = await fetch("/api/auth/csrf")
  if (!response.ok) {
    throw new Error("Failed to fetch CSRF token")
  }
  const data = await respoonse.json()
  const csrfToken = data.csrfToken

  if (!csrfToken) {
    throw new Error("No CSRF token found")
  } */

  
}

