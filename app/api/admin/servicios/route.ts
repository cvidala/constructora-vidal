import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth, adminUnauthorized } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { servicios } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'

export async function GET() {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const rows = await db.select().from(servicios).orderBy(asc(servicios.orden))
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const body = await request.json()
  const { titulo, descripcion, orden } = body
  if (!titulo) return NextResponse.json({ error: 'Título requerido' }, { status: 400 })
  const [row] = await db.insert(servicios).values({ titulo, descripcion, orden: orden ?? 0 }).returning()
  return NextResponse.json(row, { status: 201 })
}
