import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { checkAdminAuth, adminUnauthorized } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  if (!(await checkAdminAuth())) return adminUnauthorized()

  const form = await request.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Sin archivo' }, { status: 400 })

  const blob = await put(`web/${Date.now()}-${file.name}`, file, { access: 'public' })
  return NextResponse.json({ url: blob.url })
}
