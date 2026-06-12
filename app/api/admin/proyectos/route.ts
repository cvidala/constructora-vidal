import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth, adminUnauthorized } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { proyectos } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'

export async function GET() {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const rows = await db.select().from(proyectos).orderBy(asc(proyectos.orden))
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const body = await request.json()
  const { titulo, descripcion, categoria, anio, imagenUrl, orden } = body
  if (!titulo) return NextResponse.json({ error: 'Título requerido' }, { status: 400 })
  const [row] = await db.insert(proyectos).values({ titulo, descripcion, categoria, anio: anio ? Number(anio) : null, imagenUrl, orden: orden ?? 0 }).returning()
  return NextResponse.json(row, { status: 201 })
}
