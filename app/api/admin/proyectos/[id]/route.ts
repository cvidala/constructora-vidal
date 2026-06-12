import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth, adminUnauthorized } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { proyectos } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const { id } = await params
  const body = await request.json()
  const { titulo, descripcion, categoria, anio, imagenUrl, orden, activo } = body
  const [row] = await db.update(proyectos).set({ titulo, descripcion, categoria, anio: anio ? Number(anio) : null, imagenUrl, orden, activo, updatedAt: new Date() }).where(eq(proyectos.id, id)).returning()
  return NextResponse.json(row)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const { id } = await params
  await db.delete(proyectos).where(eq(proyectos.id, id))
  return NextResponse.json({ ok: true })
}
