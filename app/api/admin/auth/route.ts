import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { adminUsers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { setAdminCookie, clearAdminCookie } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  if (!email || !password) return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1)
  if (!user) return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })

  await setAdminCookie()
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await clearAdminCookie()
  return NextResponse.json({ ok: true })
}
