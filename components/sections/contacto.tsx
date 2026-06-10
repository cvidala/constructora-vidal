"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin, Clock, Mail, ClipboardList } from "lucide-react";

export default function Contacto() {
  const [mensaje, setMensaje] = useState("");
  const [desdeCotizador, setDesdeCotizador] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const { texto } = (e as CustomEvent<{ texto: string }>).detail;
      setMensaje(texto);
      setDesdeCotizador(true);
    };
    window.addEventListener("cv:cotizacion", handler);
    return () => window.removeEventListener("cv:cotizacion", handler);
  }, []);

  return (
    <section id="contacto" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky font-semibold text-sm uppercase tracking-widest">
            Hablemos
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy font-heading leading-tight">
            Contáctanos
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Cuéntanos tu proyecto y te respondemos con una cotización sin
            compromiso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-navy font-heading">
              Información de contacto
            </h3>

            <div className="space-y-4">
              <ContactItem
                icon={Phone}
                label="Teléfonos"
                value={
                  <>
                    <a href="tel:+56978262069" className="block hover:text-sky transition-colors">
                      +56 9 7826 2069
                    </a>
                    <a href="tel:+56972690873" className="block hover:text-sky transition-colors">
                      +56 9 7269 0873
                    </a>
                  </>
                }
              />
              <ContactItem
                icon={MapPin}
                label="Ubicación"
                value={<span>Región de La Araucanía, Chile</span>}
              />
              <ContactItem
                icon={Clock}
                label="Horario de atención"
                value={<span>Lunes a Viernes, 8:00 — 18:00 hrs</span>}
              />
              <ContactItem
                icon={Mail}
                label="Correo"
                value={
                  <a
                    href="mailto:jsvconstrucciones@gmail.com"
                    className="hover:text-sky transition-colors"
                  >
                    jsvconstrucciones@gmail.com
                  </a>
                }
              />
            </div>
          </div>

          {/* Form */}
          <form
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-xl font-bold text-navy font-heading mb-2">
              Solicitar cotización
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField id="nombre" label="Nombre" placeholder="Juan González" />
              <FormField
                id="telefono"
                label="Teléfono"
                placeholder="+56 9 XXXX XXXX"
                type="tel"
              />
            </div>
            <FormField
              id="email"
              label="Correo electrónico"
              placeholder="correo@ejemplo.cl"
              type="email"
            />
            <div className="space-y-1.5">
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo de obra
              </label>
              <select
                id="tipo"
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">Selecciona una opción</option>
                <option>Construcción nueva</option>
                <option>Remodelación / Ampliación</option>
                <option>Instalación eléctrica</option>
                <option>Mantención</option>
                <option>Otro</option>
              </select>
            </div>

            {/* Descripción — pre-rellena con cotizador si viene de ahí */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                  Descripción del proyecto
                </label>
                {desdeCotizador && (
                  <span className="flex items-center gap-1 text-xs text-sky font-medium">
                    <ClipboardList className="h-3.5 w-3.5" />
                    Desde Cotizador Express
                  </span>
                )}
              </div>
              <textarea
                id="mensaje"
                rows={desdeCotizador ? 8 : 4}
                placeholder="Cuéntanos en qué consiste tu proyecto..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className={`w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring resize-none font-mono transition-colors ${
                  desdeCotizador
                    ? "border-sky/40 bg-sky/3 text-gray-700"
                    : "border-input bg-transparent"
                }`}
              />
              {desdeCotizador && (
                <p className="text-xs text-gray-400">
                  Puedes editar o agregar más detalles antes de enviar.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-sky hover:bg-sky-hover text-white font-bold py-3 rounded-lg transition-colors text-sm"
            >
              Enviar solicitud
            </button>
            <p className="text-xs text-gray-400 text-center">
              Te responderemos dentro de las próximas 24 horas hábiles.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 bg-sky/10 rounded-lg p-2.5">
        <Icon className="h-5 w-5 text-sky" />
      </div>
      <div>
        <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
          {label}
        </div>
        <div className="text-gray-700 text-sm">{value}</div>
      </div>
    </div>
  );
}

function FormField({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
      />
    </div>
  );
}
