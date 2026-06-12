import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth, adminUnauthorized } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { config } from '@/lib/db/schema'

export async function GET() {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const rows = await db.select().from(config)
  const obj = Object.fromEntries(rows.map(r => [r.clave, r.valor]))
  return NextResponse.json(obj)
}

export async function POST(request: NextRequest) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const body = await request.json() as Record<string, string>
  for (const [clave, valor] of Object.entries(body)) {
    await db.insert(config).values({ clave, valor }).onConflictDoUpdate({ target: config.clave, set: { valor, updatedAt: new Date() } })
  }
  return NextResponse.json({ ok: true })
}
