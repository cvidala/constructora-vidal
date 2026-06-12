'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Globe, Image, Newspaper, Wrench, Settings, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin/proyectos', label: 'Proyectos', icon: Image },
  { href: '/admin/novedades', label: 'Novedades', icon: Newspaper },
  { href: '/admin/servicios', label: 'Servicios', icon: Wrench },
  { href: '/admin/config', label: 'Configuración', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="flex h-full min-h-screen bg-slate-900">
      <aside className="w-52 flex flex-col shrink-0 border-r border-white/5">
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
            <Globe size={16} className="text-orange-400" />
          </div>
          <div>
            <p className="text-xs text-orange-400 font-medium leading-none">constructoravidal.cl</p>
            <p className="text-sm font-semibold text-white leading-tight">Mantenedor</p>
          </div>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <Icon size={16} className="shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="px-2 py-3 border-t border-white/5">
          <button onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors w-full">
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
