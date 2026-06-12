import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth, adminUnauthorized } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { servicios } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const { id } = await params
  const body = await request.json()
  const { titulo, descripcion, orden, activo } = body
  const [row] = await db.update(servicios).set({ titulo, descripcion, orden, activo }).where(eq(servicios.id, id)).returning()
  return NextResponse.json(row)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdminAuth())) return adminUnauthorized()
  const { id } = await params
  await db.delete(servicios).where(eq(servicios.id, id))
  return NextResponse.json({ ok: true })
}
