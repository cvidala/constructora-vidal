'use client'

import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'

type Config = Record<string, string>

export default function ConfigAdmin() {
  const [cfg, setCfg] = useState<Config>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/config').then(r => r.json()).then(setCfg)
  }, [])

  function set(key: string, val: string) { setCfg(c => ({ ...c, [key]: val })) }

  async function handleGuardar() {
    setSaving(true)
    await fetch('/api/admin/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cfg) })
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const field = (label: string, key: string, placeholder?: string, textarea?: boolean) => (
    <div key={key}>
      <label className="text-sm font-medium text-slate-700 block mb-1">{label}</label>
      {textarea
        ? <textarea value={cfg[key] ?? ''} onChange={e => set(key, e.target.value)} rows={3} placeholder={placeholder} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
        : <input value={cfg[key] ?? ''} onChange={e => set(key, e.target.value)} placeholder={placeholder} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Configuración</h1>
          <p className="text-sm text-slate-500 mt-1">Textos, datos de contacto y configuración general del sitio</p>
        </div>
        <button onClick={handleGuardar} disabled={saving}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Save size={16} /> {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar cambios'}
        </button>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">WhatsApp</h2>
          <div className="space-y-3">
            {field('Número WhatsApp (solo dígitos, con código país)', 'whatsapp', '56912345678')}
          </div>
          <p className="text-xs text-slate-400 mt-2">Este número se usa para el botón de WhatsApp flotante en el sitio.</p>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Sección principal (Hero)</h2>
          <div className="space-y-3">
            {field('Título principal', 'hero_tagline', 'Construimos con calidad y compromiso')}
            {field('Subtítulo', 'hero_subtitulo', 'Descripción breve de la empresa...', true)}
            <div className="grid grid-cols-3 gap-3">
              {field('Años de experiencia', 'hero_anos', '10')}
              {field('Proyectos completados', 'hero_proyectos', '80')}
              {field('Clientes satisfechos', 'hero_clientes', '40')}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Contacto</h2>
          <div className="space-y-3">
            {field('Email de contacto', 'contacto_email', 'contacto@tuempresa.cl')}
            {field('Teléfono', 'contacto_telefono', '+56 9 1234 5678')}
            {field('Dirección / Región', 'contacto_direccion', 'La Araucanía, Chile')}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Nosotros</h2>
          <div className="space-y-3">
            {field('Misión', 'nosotros_mision', 'Misión de la empresa...', true)}
            {field('Visión', 'nosotros_vision', 'Visión de la empresa...', true)}
          </div>
        </section>
      </div>
    </div>
  )
}
