"use server"

import { signIn, signOut } from "@/lib/auth"
//import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function socialLogin(provider: string) {
  await signIn(provider, { redirectTo: '/' })
}

export async function socialLogout() {
  await signOut({ redirectTo: '/' })
}

export async function credentialsLogin(formData: FormData) {
  //const csrfToken = cookies().get("authjs.csrf-token")

  const response = await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirect: false,
    //csrfToken: csrfToken.value as string,
  })

  if (!response) {
    return { success: false, error: "No response from signIn" }
  }

  if (response?.error) {
    return { success: false, error: response.error }
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

export async function signOutNoRedirect() {
  await signOut({ redirect: false })
}

export async function signInNoRedirect(provider: string) {
  await signIn(provider, { redirect: false })
}

export async function signInRedirectTo(provider: string, redirectUrl: string) {
  await signIn(provider, { redirect: false })
  redirect(redirectUrl)
}

