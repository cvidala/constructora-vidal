const proyectos = [
  {
    titulo: "Colegio San Francisco",
    categoria: "Educación",
    año: "2024",
    desc: "Construcción de nuevas salas de clases y habilitación eléctrica completa.",
    gradiente: "from-blue-900 to-blue-700",
  },
  {
    titulo: "Edificio Comercial Centro",
    categoria: "Comercial",
    año: "2024",
    desc: "Remodelación integral de local comercial de 3 pisos en Temuco.",
    gradiente: "from-stone-700 to-stone-500",
  },
  {
    titulo: "Ampliación Liceo Técnico",
    categoria: "Educación",
    año: "2023",
    desc: "Ampliación de talleres técnicos con instalaciones eléctricas certificadas.",
    gradiente: "from-emerald-900 to-emerald-700",
  },
  {
    titulo: "Complejo Habitacional",
    categoria: "Residencial",
    año: "2023",
    desc: "12 unidades de vivienda social con todas sus instalaciones.",
    gradiente: "from-amber-800 to-amber-600",
  },
  {
    titulo: "Sede Municipal",
    categoria: "Infraestructura",
    año: "2022",
    desc: "Remodelación y ampliación de edificio municipal en la región.",
    gradiente: "from-slate-800 to-slate-600",
  },
  {
    titulo: "Centro de Salud",
    categoria: "Salud",
    año: "2022",
    desc: "Construcción de CESFAM con instalaciones especiales de seguridad.",
    gradiente: "from-teal-800 to-teal-600",
  },
];

const categoriaBadge: Record<string, string> = {
  Educación: "bg-blue-100 text-blue-800",
  Comercial: "bg-amber-100 text-amber-800",
  Residencial: "bg-green-100 text-green-800",
  Infraestructura: "bg-slate-100 text-slate-700",
  Salud: "bg-teal-100 text-teal-800",
};

export default function Proyectos() {
  return (
    <section id="proyectos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky font-semibold text-sm uppercase tracking-widest">
            Nuestro trabajo
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy font-heading leading-tight">
            Proyectos Realizados
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Una selección de obras que reflejan nuestro nivel de exigencia y el
            compromiso con nuestros clientes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((p) => (
            <div
              key={p.titulo}
              className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image placeholder — replace with real <Image> when available */}
              <div
                className={`h-48 bg-gradient-to-br ${p.gradiente} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      categoriaBadge[p.categoria] ?? "bg-white/20 text-white"
                    }`}
                  >
                    {p.categoria}
                  </span>
                </div>
                <div className="absolute top-4 right-4 text-white/60 text-xs font-mono">
                  {p.año}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-navy text-base mb-1 font-heading">
                  {p.titulo}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note about images */}
        <p className="text-center text-gray-400 text-sm mt-10">
          * Las imágenes de las obras se actualizarán con fotografías reales próximamente.
        </p>
      </div>
    </section>
  );
}
