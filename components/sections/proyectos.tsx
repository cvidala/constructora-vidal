import { db } from '@/lib/db'
import { proyectos as proyectosTable } from '@/lib/db/schema'
import { asc, eq } from 'drizzle-orm'

const categoriaBadge: Record<string, string> = {
  Educación: 'bg-blue-100 text-blue-800',
  Comercial: 'bg-amber-100 text-amber-800',
  Residencial: 'bg-green-100 text-green-800',
  Infraestructura: 'bg-slate-100 text-slate-700',
  Salud: 'bg-teal-100 text-teal-800',
}

const gradientes = [
  'from-blue-900 to-blue-700', 'from-stone-700 to-stone-500',
  'from-emerald-900 to-emerald-700', 'from-amber-800 to-amber-600',
  'from-slate-800 to-slate-600', 'from-teal-800 to-teal-600',
]

export default async function Proyectos() {
  const data = await db.select().from(proyectosTable).where(eq(proyectosTable.activo, true)).orderBy(asc(proyectosTable.orden))

  return (
    <section id="proyectos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky font-semibold text-sm uppercase tracking-widest">Nuestro trabajo</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy font-heading leading-tight">Proyectos Realizados</h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">Una selección de obras que reflejan nuestro nivel de exigencia y el compromiso con nuestros clientes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((p, i) => (
            <div key={p.id} className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`h-48 relative overflow-hidden ${p.imagenUrl ? '' : `bg-gradient-to-br ${gradientes[i % gradientes.length]}`}`}>
                {p.imagenUrl
                  ? <img src={p.imagenUrl} alt={p.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />}
                <div className="absolute bottom-4 left-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoriaBadge[p.categoria ?? ''] ?? 'bg-white/20 text-white'}`}>
                    {p.categoria}
                  </span>
                </div>
                {p.anio && <div className="absolute top-4 right-4 text-white/60 text-xs font-mono">{p.anio}</div>}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy text-base mb-1 font-heading">{p.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
