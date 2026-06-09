import {
  Building2,
  Zap,
  Wrench,
  HardHat,
  ClipboardList,
  Shield,
} from "lucide-react";

const servicios = [
  {
    icon: Building2,
    titulo: "Construcción General",
    desc: "Edificaciones residenciales, comerciales y de uso público. Desde los cimientos hasta la entrega final.",
  },
  {
    icon: Wrench,
    titulo: "Remodelaciones y Ampliaciones",
    desc: "Transformamos espacios existentes: ampliaciones de planta, renovación de interiores y exteriores.",
  },
  {
    icon: Zap,
    titulo: "Instalaciones Eléctricas",
    desc: "Proyectos eléctricos para establecimientos educacionales, edificios y obras de infraestructura.",
  },
  {
    icon: HardHat,
    titulo: "Obras de Infraestructura",
    desc: "Proyectos de pavimentación, urbanización y obras civiles menores para municipios y privados.",
  },
  {
    icon: ClipboardList,
    titulo: "Gestión de Proyectos",
    desc: "Asesoría técnica, cubicaciones, presupuestos y coordinación integral de obras desde el diseño.",
  },
  {
    icon: Shield,
    titulo: "Mantención Preventiva",
    desc: "Servicios de mantención planificada para instalaciones comerciales, industriales y educacionales.",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky font-semibold text-sm uppercase tracking-widest">
            Lo que hacemos
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy font-heading leading-tight">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Cubrimos todas las etapas de una obra, con equipos especializados y
            comprometidos con cada proyecto.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((s) => (
            <div
              key={s.titulo}
              className="group p-6 rounded-xl border border-gray-100 hover:border-sky/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
            >
              <div className="inline-flex p-3 rounded-xl bg-sky-light group-hover:bg-sky/20 transition-colors mb-5">
                <s.icon className="h-6 w-6 text-sky" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2 font-heading">
                {s.titulo}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
