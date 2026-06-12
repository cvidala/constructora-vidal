'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, Image as ImageIcon, GripVertical } from 'lucide-react'

interface Proyecto {
  id: string; titulo: string; descripcion: string | null; categoria: string | null
  anio: number | null; imagenUrl: string | null; orden: number | null; activo: boolean | null
}
const formVacio = { titulo: '', descripcion: '', categoria: '', anio: new Date().getFullYear().toString(), imagenUrl: '', orden: '0', activo: true }

export default function ProyectosAdmin() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...formVacio })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const data = await fetch('/api/admin/proyectos').then(r => r.json())
    setProyectos(data)
  }
  useEffect(() => { load() }, [])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const { url } = await fetch('/api/admin/upload', { method: 'POST', body: fd }).then(r => r.json())
    setForm(f => ({ ...f, imagenUrl: url }))
    setUploading(false)
  }

  async function handleGuardar() {
    setLoading(true)
    const body = { ...form, anio: form.anio ? Number(form.anio) : null, orden: Number(form.orden) }
    if (editId) {
      await fetch(`/api/admin/proyectos/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } else {
      await fetch('/api/admin/proyectos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    }
    setLoading(false); setOpen(false); load()
  }

  async function handleEliminar(id: string) {
    if (!confirm('¿Eliminar este proyecto?')) return
    await fetch(`/api/admin/proyectos/${id}`, { method: 'DELETE' })
    load()
  }

  function abrirNuevo() { setForm({ ...formVacio, orden: String(proyectos.length) }); setEditId(null); setOpen(true) }
  function abrirEditar(p: Proyecto) {
    setForm({ titulo: p.titulo, descripcion: p.descripcion ?? '', categoria: p.categoria ?? '', anio: p.anio?.toString() ?? '', imagenUrl: p.imagenUrl ?? '', orden: p.orden?.toString() ?? '0', activo: p.activo !== false })
    setEditId(p.id); setOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Proyectos</h1>
          <p className="text-sm text-slate-500 mt-1">Portafolio de obras que aparece en el sitio web</p>
        </div>
        <button onClick={abrirNuevo} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} /> Nuevo proyecto
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-slate-50 border-b border-slate-100">
            <th className="w-8" />
            <th className="text-left px-4 py-3 font-medium text-slate-600">Proyecto</th>
            <th className="text-left px-4 py-3 font-medium text-slate-600">Categoría</th>
            <th className="text-left px-4 py-3 font-medium text-slate-600">Año</th>
            <th className="text-left px-4 py-3 font-medium text-slate-600">Foto</th>
            <th className="text-left px-4 py-3 font-medium text-slate-600">Estado</th>
            <th className="w-20" />
          </tr></thead>
          <tbody>
            {proyectos.map(p => (
              <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-2 py-3 text-slate-300"><GripVertical size={16} /></td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-800">{p.titulo}</div>
                  <div className="text-xs text-slate-400 truncate max-w-[240px]">{p.descripcion}</div>
                </td>
                <td className="px-4 py-3"><span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{p.categoria ?? '—'}</span></td>
                <td className="px-4 py-3 text-slate-500">{p.anio ?? '—'}</td>
                <td className="px-4 py-3">
                  {p.imagenUrl
                    ? <img src={p.imagenUrl} alt="" className="w-10 h-10 rounded object-cover border border-slate-200" />
                    : <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center"><ImageIcon size={14} className="text-slate-300" /></div>}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.activo !== false ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                    {p.activo !== false ? 'visible' : 'oculto'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => abrirEditar(p)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Pencil size={14} /></button>
                    <button onClick={() => handleEliminar(p.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {proyectos.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">No hay proyectos</td></tr>}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">{editId ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div><label className="text-sm text-slate-600 block mb-1">Título *</label>
                <input value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
              <div><label className="text-sm text-slate-600 block mb-1">Descripción</label>
                <textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} rows={2} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm text-slate-600 block mb-1">Categoría</label>
                  <input value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} placeholder="Educación, Comercial..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
                <div><label className="text-sm text-slate-600 block mb-1">Año</label>
                  <input type="number" value={form.anio} onChange={e => setForm(f => ({ ...f, anio: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
              </div>
              <div><label className="text-sm text-slate-600 block mb-1">Foto</label>
                <div className="flex items-center gap-3">
                  {form.imagenUrl && <img src={form.imagenUrl} alt="" className="w-16 h-16 rounded object-cover border border-slate-200" />}
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-500 hover:border-orange-400 hover:text-orange-500 transition-colors">
                    <ImageIcon size={16} /> {uploading ? 'Subiendo...' : form.imagenUrl ? 'Cambiar foto' : 'Subir foto'}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="activo" checked={form.activo} onChange={e => setForm(f => ({ ...f, activo: e.target.checked }))} className="rounded" />
                <label htmlFor="activo" className="text-sm text-slate-600">Visible en el sitio web</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancelar</button>
              <button onClick={handleGuardar} disabled={loading || !form.titulo || uploading}
                className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-medium rounded-lg transition-colors">
                {loading ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear proyecto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
