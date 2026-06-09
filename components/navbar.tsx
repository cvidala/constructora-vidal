"use client";

import { useState, useEffect } from "react";
import { Menu, X, HardHat } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Herramientas", href: "#herramientas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-sm shadow-lg"
          : "bg-navy"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleLink("#inicio")}
            className="flex items-center gap-2 text-white font-heading font-700"
          >
            <div className="bg-gold rounded p-1.5">
              <HardHat className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-wide leading-tight">
              CONSTRUCTORA<br className="hidden sm:block" />
              <span className="sm:block"> VIDAL</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="px-3 py-2 text-sm text-white/80 hover:text-white hover:text-gold transition-colors rounded-md font-medium"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleLink("#contacto")}
              className="ml-3 bg-gold hover:bg-gold-hover text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              Cotizar
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-light border-t border-white/10">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="text-left py-3 px-2 text-white/80 hover:text-white border-b border-white/5 text-sm font-medium"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleLink("#contacto")}
              className="mt-3 bg-gold text-white py-3 rounded-md font-semibold text-sm"
            >
              Solicitar Cotización
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
