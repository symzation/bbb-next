'use server'
 
import { cookies } from 'next/headers'

const cookiePrefix = process.env.COOKIE_PREFIX

export async function createCookie(name: string, value: string, expInDays?: number) {
  const maxAge = 60 * 60 * 24 * (expInDays ?? 7) * 1000
  const expiresAt = new Date(Date.now() + maxAge)
  const cookieStore = await cookies()

  cookieStore.set({
    name: `${cookiePrefix}${name}`,
    value: value,
    httpOnly: true,
    path: '/',
    expires: expiresAt,
  })
}

/* export async function updateCookie(name: string, value: string, expInDays?: number) {
  const maxAge = 60 * 60 * 24 * (expInDays ?? 7) * 1000
  const cookieStore = await cookies()
  const expiresAt = new Date(Date.now() + maxAge)


  cookieStore.set({
    name: `${cookiePrefix}${name}`,
    value: value,
    httpOnly: true,
    path: '/',
    expires: expiresAt,
  })
} */

export async function getCookie(name: string) {
  const cookie = (await cookies()).get(`${cookiePrefix}${name}`)
  return cookie ?? null
}

export async function hasCookie(name: string) {
  const cookie = (await cookies()).has(`${cookiePrefix}${name}`)
  return cookie ?? undefined
}

export async function getAllCookies() {
  const allCookies = (await cookies()).getAll()
  return allCookies
}

export async function deleteCookie(name: string) {
  (await cookies()).delete(`${cookiePrefix}${name}'`)
}