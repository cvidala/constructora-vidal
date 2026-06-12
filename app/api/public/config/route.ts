import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { config } from '@/lib/db/schema'

export const revalidate = 300

export async function GET() {
  const rows = await db.select().from(config)
  const obj = Object.fromEntries(rows.map(r => [r.clave, r.valor]))
  return NextResponse.json(obj)
}
