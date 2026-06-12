'use client'

import { useEffect, useState } from 'react'
import { Pencil, Check, X } from 'lucide-react'

interface Servicio { id: string; titulo: string; descripcion: string | null; orden: number | null; activo: boolean | null }

export default function ServiciosAdmin() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ titulo: '', descripcion: '' })
  const [loading, setLoading] = useState(false)

  async function load() {
    const data = await fetch('/api/admin/servicios').then(r => r.json())
    setServicios(data)
  }
  useEffect(() => { load() }, [])

  function startEdit(s: Servicio) { setForm({ titulo: s.titulo, descripcion: s.descripcion ?? '' }); setEditId(s.id) }
  function cancelEdit() { setEditId(null) }

  async function saveEdit(s: Servicio) {
    setLoading(true)
    await fetch(`/api/admin/servicios/${s.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...s, ...form }) })
    setLoading(false); setEditId(null); load()
  }

  async function toggleActivo(s: Servicio) {
    await fetch(`/api/admin/servicios/${s.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...s, activo: !s.activo }) })
    load()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Servicios</h1>
        <p className="text-sm text-slate-500 mt-1">Edita los servicios que ofrece la empresa en el sitio web</p>
      </div>
      <div className="space-y-3">
        {servicios.map((s, i) => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            {editId === s.id ? (
              <div className="space-y-2">
                <input value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(s)} disabled={loading || !form.titulo} className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-white text-sm rounded-lg disabled:opacity-50"><Check size={14} /> Guardar</button>
                  <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50"><X size={14} /> Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <h3 className={`font-semibold ${s.activo === false ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{s.titulo}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{s.descripcion}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => startEdit(s)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><Pencil size={14} /></button>
                  <button onClick={() => toggleActivo(s)} className={`p-1.5 rounded text-xs font-medium transition-colors ${s.activo !== false ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                    {s.activo !== false ? 'visible' : 'oculto'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
