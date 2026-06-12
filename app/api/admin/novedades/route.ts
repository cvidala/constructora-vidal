import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth, adminUnauthorized } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { novedades } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const rows = await db.select().from(novedades).orderBy(desc(novedades.createdAt))
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const body = await request.json()
  const { titulo, contenido, imagenUrl, publicado } = body
  if (!titulo) return NextResponse.json({ error: 'Título requerido' }, { status: 400 })
  const [row] = await db.insert(novedades).values({ titulo, contenido, imagenUrl, publicado: !!publicado }).returning()
  return NextResponse.json(row, { status: 201 })
}
