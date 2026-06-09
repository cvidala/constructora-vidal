import { HardHat, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Herramientas", href: "#herramientas" },
  { label: "Contacto", href: "#contacto" },
];

const serviciosLinks = [
  "Construcción General",
  "Remodelaciones",
  "Instalaciones Eléctricas",
  "Obras de Infraestructura",
  "Gestión de Proyectos",
  "Mantención",
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gold rounded p-1.5">
                <HardHat className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold font-heading tracking-wide">
                CONSTRUCTORA VIDAL
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Empresa constructora de la Región de La Araucanía, Chile.
              Construimos con calidad y compromiso.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <span>+56 9 7826 2069</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <span>La Araucanía, Chile</span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Navegación
            </h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Servicios
            </h4>
            <ul className="space-y-2">
              {serviciosLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#servicios"
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              ¿Tienes un proyecto?
            </h4>
            <p className="text-sm leading-relaxed mb-5">
              Contáctanos hoy y te entregamos una cotización sin compromiso
              para tu obra o remodelación.
            </p>
            <a
              href="#contacto"
              className="inline-block bg-gold hover:bg-gold-hover text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Cotizar ahora
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© {year} Constructora Vidal Ltda. Todos los derechos reservados.</span>
          <span>Región de La Araucanía, Chile</span>
        </div>
      </div>
    </footer>
  );
}
