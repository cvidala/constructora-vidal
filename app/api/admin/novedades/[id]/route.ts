import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth, adminUnauthorized } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { novedades } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const { id } = await params
  const body = await request.json()
  const { titulo, contenido, imagenUrl, publicado } = body
  const [row] = await db.update(novedades).set({ titulo, contenido, imagenUrl, publicado: !!publicado, updatedAt: new Date() }).where(eq(novedades.id, id)).returning()
  return NextResponse.json(row)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const { id } = await params
  await db.delete(novedades).where(eq(novedades.id, id))
  return NextResponse.json({ ok: true })
}
