import { Target, Eye, CheckCircle2 } from "lucide-react";

const valores = [
  "Calidad sin negociación en cada etapa",
  "Cumplimiento riguroso de plazos",
  "Seguridad como prioridad absoluta",
  "Transparencia con nuestros clientes",
  "Trabajo en equipo y profesionalismo",
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Quiénes somos
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
            Constructora Vidal Ltda.
          </h2>
          <p className="mt-4 text-white/60 text-lg leading-relaxed">
            Somos una empresa constructora de la Región de La Araucanía,
            con más de una década de trayectoria ejecutando proyectos para
            clientes públicos y privados en toda la zona.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Misión */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-colors">
            <div className="flex items-start gap-4">
              <div className="shrink-0 bg-gold/20 rounded-lg p-3">
                <Target className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading mb-3">
                  Nuestra Misión
                </h3>
                <p className="text-white/65 leading-relaxed">
                  Brindar servicios de construcción de alta calidad, comprometidos
                  con los plazos, la seguridad y la plena satisfacción de nuestros
                  clientes. Cada obra que ejecutamos refleja nuestro nivel de
                  exigencia y el orgullo de hacer las cosas bien.
                </p>
              </div>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-colors">
            <div className="flex items-start gap-4">
              <div className="shrink-0 bg-gold/20 rounded-lg p-3">
                <Eye className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading mb-3">
                  Nuestra Visión
                </h3>
                <p className="text-white/65 leading-relaxed">
                  Consolidarnos como la empresa constructora de referencia en la
                  Región de La Araucanía, reconocida por la excelencia técnica,
                  la capacidad de ejecución y la confianza que generamos en cada
                  cliente que nos elige.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-gold/10 border border-gold/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white font-heading mb-6 text-center">
            Nuestros Valores
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {valores.map((v) => (
              <div key={v} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" strokeWidth={2} />
                <span className="text-white/80 text-sm">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
