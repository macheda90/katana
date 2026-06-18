import crypto from 'crypto'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':')
    if (!salt || !hash) return false
    const verify = crypto.scryptSync(password, salt, 64).toString('hex')
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verify, 'hex'))
  } catch {
    return false
  }
}

const SESSION_COOKIE = 'katana_session'
const SESSION_MAX_AGE_NORMAL = 60 * 60 * 24 // 1 day
const SESSION_MAX_AGE_REMEMBER = 60 * 60 * 24 * 30 // 30 days

export async function createSession(userId: string, remember = false) {
  const maxAge = remember ? SESSION_MAX_AGE_REMEMBER : SESSION_MAX_AGE_NORMAL
  const token = Buffer.from(JSON.stringify({ id: userId, ts: Date.now() })).toString('base64')
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSessionUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value
    if (!token) return null
    const data = JSON.parse(Buffer.from(token, 'base64').toString())
    if (!data.id) return null
    const user = await db.user.findUnique({
      where: { id: data.id },
      select: { id: true, email: true, name: true, role: true, avatar: true, isActive: true, memberId: true },
    })
    if (!user || !user.isActive) return null
    return user
  } catch {
    return null
  }
}

export const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'PENGURUS', 'KOORDINATOR_DIVISI']

// Role hierarchy for permission checks
export const ROLE_LEVELS: Record<string, number> = {
  SUPER_ADMIN: 100,
  ADMIN: 80,
  PENGURUS: 60,
  KOORDINATOR_DIVISI: 40,
  ANGGOTA: 20,
  RELAWAN: 10,
}

export function hasRole(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole)
}
