"use server"

import { signIn, signOut } from "@/lib/auth"
import { getAuthSession } from "@/actions/sessionActions" 
import { deleteDbSessions } from "@/lib/db/queries"
import { redirect } from "next/navigation"

export async function login(
  provider: string, 
  useRedirect: boolean = true, 
  redirectUrl?: string
) {
  if (useRedirect) {
    await signIn(provider, { redirectTo: '/' })
  } else {
    await signIn(provider, { redirect: false })
    if (redirectUrl) redirect(redirectUrl)
  }
}

/* export async function signInNoRedirect(provider: string) {
  await signIn(provider, { redirect: false })
} */

/* export async function signInRedirectTo(provider: string, redirectUrl: string) {
  await signIn(provider, { redirect: false })
  redirect(redirectUrl)
} */

export async function logout(
  useRedirect: boolean = true, 
  redirectUrl?: string
) {
  const session = await getAuthSession() 
  if (session?.user) {
    await deleteDbSessions(session.user.id as string)
  }

  if (useRedirect) {
    await signOut({ redirectTo: '/' })
  } else {
    await signOut({ redirect: false })
    if (redirectUrl) redirect(redirectUrl)
  }
}

/* export async function signOutNoRedirect() {
  await signOut({ redirect: false })
} */


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
