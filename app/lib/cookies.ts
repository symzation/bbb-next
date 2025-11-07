'use server'
 
import { cookies } from 'next/headers'

const cookiePrefix = process.env.COOKIE_PREFIX
const defaultExpInDays = Number(process.env.COOKIE_EXPIRATION_DAYS) || 7

export async function createCookie(name: string, value: string, expInDays?: number) {
  const days = typeof expInDays === 'number' ? expInDays : defaultExpInDays
  const maxAge = 60 * 60 * 24 * days * 1000
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
  const cookieStore = await cookies()
  if (!cookieStore) return
  const cookie = cookieStore.get(`${cookiePrefix}${name}`)
  return cookie
}

export async function hasCookie(name: string) {
  const cookieStore = await cookies()
  if (!cookieStore) return
  const cookie = cookieStore.has(`${cookiePrefix}${name}`)
  return cookie
}

export async function getAllCookies() {
  const cookieStore = await cookies()
  if (!cookieStore) return
  const allCookies = cookieStore.getAll()
  return allCookies
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies()
  if (!cookieStore) return
  cookieStore.delete(`${cookiePrefix}${name}`)
}