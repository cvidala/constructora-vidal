import { db } from '@/lib/db'
import { config } from '@/lib/db/schema'

async function getConfig() {
  const rows = await db.select().from(config)
  return Object.fromEntries(rows.map(r => [r.clave, r.valor ?? '']))
}

export default async function Hero() {
  const cfg = await getConfig()

  const tagline = cfg.hero_tagline || 'Construimos con calidad y compromiso'
  const subtitulo = cfg.hero_subtitulo || 'Más de una década ejecutando proyectos de construcción, remodelación e instalaciones en la región.'
  const anos = cfg.hero_anos || '10'
  const proyectos = cfg.hero_proyectos || '80'
  const clientes = cfg.hero_clientes || '40'
  const region = cfg.contacto_direccion || 'La Araucanía, Chile'

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.3) 40px,rgba(255,255,255,0.3) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.3) 40px,rgba(255,255,255,0.3) 41px)` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light/60" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-sky" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-sky/20 border border-sky/40 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-sky animate-pulse" />
          <span className="text-sky text-sm font-semibold tracking-wider uppercase">{region}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight font-heading">
          {tagline.includes('calidad') ? (
            <>{tagline.split('calidad')[0]}<span className="text-sky">calidad</span>{tagline.split('calidad')[1]}</>
          ) : tagline}
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">{subtitulo}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#proyectos" className="w-full sm:w-auto bg-sky hover:bg-sky-hover text-white font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:shadow-lg hover:shadow-sky/20 hover:-translate-y-0.5">Ver nuestros proyectos</a>
          <a href="#contacto" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg text-base border border-white/30 transition-all duration-200">Solicitar cotización</a>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {[
            { value: `+${anos}`, label: 'Años de experiencia' },
            { value: `+${proyectos}`, label: 'Proyectos completados' },
            { value: `+${clientes}`, label: 'Clientes satisfechos' },
            { value: '100%', label: 'Compromiso garantizado' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky font-heading">{s.value}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-sky animate-bounce origin-top scale-y-50" />
        </div>
      </div>
    </section>
  )
}
