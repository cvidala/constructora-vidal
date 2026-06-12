import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { proyectos } from '@/lib/db/schema'
import { asc, eq } from 'drizzle-orm'

export const revalidate = 300

export async function GET() {
  const rows = await db.select().from(proyectos).where(eq(proyectos.activo, true)).orderBy(asc(proyectos.orden))
  return NextResponse.json(rows)
}
