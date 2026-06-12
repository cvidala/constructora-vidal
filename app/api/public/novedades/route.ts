import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { novedades } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export const revalidate = 300

export async function GET() {
  const rows = await db.select().from(novedades).where(eq(novedades.publicado, true)).orderBy(desc(novedades.createdAt))
  return NextResponse.json(rows)
}
