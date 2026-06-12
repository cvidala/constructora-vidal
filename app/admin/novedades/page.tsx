'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react'

interface Novedad {
  id: string; titulo: string; contenido: string | null
  imagenUrl: string | null; publicado: boolean | null; createdAt: string | null
}

export default function NovedadesAdmin() {
  const [novedades, setNovedades] = useState<Novedad[]>([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ titulo: '', contenido: '', imagenUrl: '', publicado: false })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const data = await fetch('/api/admin/novedades').then(r => r.json())
    setNovedades(data)
  }
  useEffect(() => { load() }, [])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const { url } = await fetch('/api/admin/upload', { method: 'POST', body: fd }).then(r => r.json())
    setForm(f => ({ ...f, imagenUrl: url })); setUploading(false)
  }

  async function handleGuardar() {
    setLoading(true)
    if (editId) {
      await fetch(`/api/admin/novedades/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/admin/novedades', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setLoading(false); setOpen(false); load()
  }

  async function handleEliminar(id: string) {
    if (!confirm('¿Eliminar esta novedad?')) return
    await fetch(`/api/admin/novedades/${id}`, { method: 'DELETE' }); load()
  }

  async function togglePublicado(n: Novedad) {
    await fetch(`/api/admin/novedades/${n.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...n, publicado: !n.publicado }) })
    load()
  }

  function abrirNuevo() { setForm({ titulo: '', contenido: '', imagenUrl: '', publicado: false }); setEditId(null); setOpen(true) }
  function abrirEditar(n: Novedad) {
    setForm({ titulo: n.titulo, contenido: n.contenido ?? '', imagenUrl: n.imagenUrl ?? '', publicado: !!n.publicado })
    setEditId(n.id); setOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Novedades</h1>
          <p className="text-sm text-slate-500 mt-1">Noticias y novedades de la empresa</p>
        </div>
        <button onClick={abrirNuevo} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} /> Nueva novedad
        </button>
      </div>

      <div className="grid gap-4">
        {novedades.map(n => (
          <div key={n.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-4 items-start">
            {n.imagenUrl
              ? <img src={n.imagenUrl} alt="" className="w-20 h-20 rounded-lg object-cover border border-slate-200 shrink-0" />
              : <div className="w-20 h-20 rounded-lg bg-slate-100 flex items-center justify-center shrink-0"><ImageIcon size={20} className="text-slate-300" /></div>}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-800">{n.titulo}</h3>
                <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${n.publicado ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {n.publicado ? 'publicado' : 'borrador'}
                </span>
              </div>
              {n.contenido && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{n.contenido}</p>}
              <p className="text-xs text-slate-400 mt-2">{n.createdAt ? new Date(n.createdAt).toLocaleDateString('es-CL') : ''}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => togglePublicado(n)} title={n.publicado ? 'Ocultar' : 'Publicar'}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                {n.publicado ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              <button onClick={() => abrirEditar(n)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Pencil size={15} /></button>
              <button onClick={() => handleEliminar(n.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {novedades.length === 0 && <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">No hay novedades. Crea la primera.</div>}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
              <h2 className="font-semibold text-slate-900">{editId ? 'Editar novedad' : 'Nueva novedad'}</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div><label className="text-sm text-slate-600 block mb-1">Título *</label>
                <input value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
              <div><label className="text-sm text-slate-600 block mb-1">Contenido</label>
                <textarea value={form.contenido} onChange={e => setForm(f => ({ ...f, contenido: e.target.value }))} rows={5} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" placeholder="Describe la novedad..." /></div>
              <div><label className="text-sm text-slate-600 block mb-1">Imagen destacada</label>
                <div className="flex items-center gap-3">
                  {form.imagenUrl && <img src={form.imagenUrl} alt="" className="w-16 h-16 rounded object-cover border border-slate-200" />}
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-500 hover:border-orange-400 hover:text-orange-500 transition-colors">
                    <ImageIcon size={16} /> {uploading ? 'Subiendo...' : form.imagenUrl ? 'Cambiar imagen' : 'Subir imagen'}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="publicado" checked={form.publicado} onChange={e => setForm(f => ({ ...f, publicado: e.target.checked }))} className="rounded" />
                <label htmlFor="publicado" className="text-sm text-slate-600">Publicar en el sitio web</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
              <button onClick={handleGuardar} disabled={loading || !form.titulo || uploading}
                className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-medium rounded-lg transition-colors">
                {loading ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear novedad'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
