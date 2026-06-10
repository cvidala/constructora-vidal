"use client";

import { useState } from "react";
import { Plus, Trash2, Calculator, AlertCircle, Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  PARTIDAS,
  CATEGORIAS,
  calcularRango,
  formatCLP,
  type Calidad,
} from "@/lib/precios";

type Item = {
  id: number;
  partidaKey: string;
  calidad: Calidad;
  cantidad: number;
  label: string;
  unidad: string;
  rango: { min: number; max: number };
  dimLabel: string;   // "8.00 × 2.50 m", "30 m²", "1 unidad"
  spec: string;       // descripción técnica
};

const CALIDADES: { value: Calidad; label: string }[] = [
  { value: "basico",   label: "Básico"   },
  { value: "estandar", label: "Estándar" },
  { value: "premium",  label: "Premium"  },
];

let nextId = 1;

function buildDimLabel(
  input: string,
  dim1: number,
  dim2: number,
  cantidad: number,
  unidad: string
): string {
  if (input === "longxalto") return `${dim1.toFixed(2)} × ${dim2.toFixed(2)} m = ${cantidad.toFixed(2)} m²`;
  if (input === "area")      return `${cantidad.toFixed(2)} ${unidad}`;
  return `${Math.round(cantidad)} ${unidad}`;
}

export default function Cotizador() {
  const [partidaKey, setPartidaKey] = useState(Object.keys(PARTIDAS)[0]);
  const [calidad, setCalidad]       = useState<Calidad>("estandar");
  const [dim1, setDim1]             = useState("");
  const [dim2, setDim2]             = useState("");
  const [items, setItems]           = useState<Item[]>([]);

  const partida  = PARTIDAS[partidaKey];
  const v1       = parseFloat(dim1) || 0;
  const v2       = parseFloat(dim2) || 0;
  const cantidad = partida.input === "longxalto" ? v1 * v2 : v1;
  const canAdd   = cantidad > 0;
  const preview  = canAdd ? calcularRango(partidaKey, calidad, cantidad) : null;

  const agregar = () => {
    if (!canAdd) return;
    const rango    = calcularRango(partidaKey, calidad, cantidad);
    const dimLabel = buildDimLabel(partida.input, v1, v2, cantidad, partida.unidad);
    setItems((prev) => [
      ...prev,
      {
        id: nextId++,
        partidaKey,
        calidad,
        cantidad,
        label: partida.label,
        unidad: partida.unidad,
        rango,
        dimLabel,
        spec: partida.specs[calidad],
      },
    ]);
    setDim1("");
    setDim2("");
  };

  const eliminar = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const totalMin = items.reduce((s, i) => s + i.rango.min, 0);
  const totalMax = items.reduce((s, i) => s + i.rango.max, 0);

  return (
    <section id="cotizador" className="py-24 bg-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sky font-semibold text-sm uppercase tracking-widest">
            Sin registro · Sin compromiso
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
            Cotizador Express
          </h2>
          <p className="mt-4 text-white/60 text-lg leading-relaxed">
            Agrega todos los elementos de tu proyecto —{" "}
            <span className="text-white/80">puedes combinar partidas</span> — y
            obtén un rango de costo estimado basado en precios de mercado de La
            Araucanía.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* ---- Formulario ---- */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold font-heading flex-1">
                Agregar elemento
              </h3>
              {items.length > 0 && (
                <span className="text-xs bg-sky/20 text-sky border border-sky/30 rounded-full px-2.5 py-0.5 font-semibold">
                  {items.length} en lista
                </span>
              )}
            </div>

            {/* Partida */}
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs uppercase tracking-wide">
                ¿Qué quieres hacer?
              </Label>
              <select
                className="w-full h-9 rounded-lg border border-white/15 bg-white/8 text-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-sky"
                value={partidaKey}
                onChange={(e) => { setPartidaKey(e.target.value); setDim1(""); setDim2(""); }}
              >
                {CATEGORIAS.map((cat) => (
                  <optgroup key={cat} label={cat}>
                    {Object.entries(PARTIDAS)
                      .filter(([, p]) => p.categoria === cat)
                      .map(([k, p]) => (
                        <option key={k} value={k}>{p.label}</option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Dimensiones */}
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs uppercase tracking-wide">
                {partida.input === "longxalto" ? "Dimensiones" :
                 partida.input === "area"      ? `Superficie (${partida.unidad})` :
                                                 "Cantidad"}
              </Label>
              {partida.input === "longxalto" ? (
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" min="0" step="0.1" placeholder="Largo (m)"
                    value={dim1} onChange={(e) => setDim1(e.target.value)}
                    className="w-full h-9 rounded-lg border border-white/15 bg-white/8 text-white px-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-sky" />
                  <input type="number" min="0" step="0.1" placeholder="Alto (m)"
                    value={dim2} onChange={(e) => setDim2(e.target.value)}
                    className="w-full h-9 rounded-lg border border-white/15 bg-white/8 text-white px-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-sky" />
                </div>
              ) : (
                <input type="number" min="0" step={partida.input === "unidad" ? "1" : "0.1"}
                  placeholder={partida.input === "unidad" ? "Cantidad" : `m²`}
                  value={dim1} onChange={(e) => setDim1(e.target.value)}
                  className="w-full h-9 rounded-lg border border-white/15 bg-white/8 text-white px-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-sky" />
              )}
              {partida.input === "longxalto" && v1 > 0 && v2 > 0 && (
                <p className="text-sky text-xs">= {(v1 * v2).toFixed(2)} m²</p>
              )}
            </div>

            {/* Calidad */}
            <div className="space-y-2">
              <Label className="text-white/70 text-xs uppercase tracking-wide">
                Calidad de terminación
              </Label>
              <div className="grid grid-cols-3 gap-1.5">
                {CALIDADES.map((c) => (
                  <button key={c.value} onClick={() => setCalidad(c.value)}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                      calidad === c.value
                        ? "bg-sky text-white border-sky"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/25"
                    }`}>
                    {c.label}
                  </button>
                ))}
              </div>
              {/* Spec preview */}
              <p className="text-white/40 text-xs leading-relaxed min-h-[2.5rem]">
                {partida.specs[calidad]}
              </p>
            </div>

            {/* Preview */}
            {preview && (
              <div className="bg-sky/10 border border-sky/20 rounded-lg p-3 space-y-1">
                <div className="text-white text-sm font-medium">{partida.label}</div>
                <div className="text-white/60 text-xs">
                  {buildDimLabel(partida.input, v1, v2, cantidad, partida.unidad)}
                </div>
                <div className="text-sky text-sm font-semibold">
                  {formatCLP(preview.min)} – {formatCLP(preview.max)}
                </div>
              </div>
            )}

            <button onClick={agregar} disabled={!canAdd}
              className="w-full flex items-center justify-center gap-2 bg-sky hover:bg-sky-hover disabled:bg-white/10 disabled:text-white/30 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
              <Plus className="h-4 w-4" />
              Agregar al presupuesto
            </button>
          </div>

          {/* ---- Lista + Total ---- */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-sky" />
                <h3 className="text-white font-semibold font-heading flex-1">
                  Tu presupuesto
                </h3>
                {items.length > 0 && (
                  <button onClick={() => setItems([])}
                    className="text-white/30 hover:text-red-400 text-xs transition-colors">
                    Limpiar todo
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12 text-white/30">
                  <Calculator className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    Agrega elementos desde el formulario.
                    <br />
                    <span className="text-white/20 text-xs">
                      Puedes combinar varias partidas.
                    </span>
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id}
                      className="rounded-xl bg-white/4 border border-white/8 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-semibold">
                            {item.label}
                          </div>
                          {/* Dimensiones + calidad */}
                          <div className="text-sky/80 text-xs mt-0.5 font-mono">
                            {item.dimLabel} · {CALIDADES.find((c) => c.value === item.calidad)?.label}
                          </div>
                          {/* Especificación técnica */}
                          <div className="text-white/40 text-xs mt-1 leading-relaxed">
                            {item.spec}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sky text-sm font-bold">
                            {formatCLP(item.rango.min)}
                          </div>
                          <div className="text-white/35 text-xs">
                            hasta {formatCLP(item.rango.max)}
                          </div>
                        </div>
                        <button onClick={() => eliminar(item.id)}
                          className="text-white/20 hover:text-red-400 transition-colors mt-0.5">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            {items.length > 0 && (
              <div className="bg-sky/15 border border-sky/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-bold font-heading text-lg">
                    Total estimado
                  </span>
                  <span className="text-xs text-white/50 bg-white/10 px-2.5 py-0.5 rounded-full">
                    {items.length} partida{items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="text-4xl font-extrabold text-white font-heading">
                  {formatCLP(totalMin)}
                </div>
                <div className="text-sky text-sm mt-0.5">
                  hasta {formatCLP(totalMax)}
                </div>

                <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-white/50">
                      <span className="truncate mr-2">
                        {item.label} · {item.dimLabel}
                      </span>
                      <span className="shrink-0 text-white/70">
                        {formatCLP(item.rango.min)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-start gap-2 bg-black/20 rounded-lg p-3">
                  <AlertCircle className="h-4 w-4 text-white/40 mt-0.5 shrink-0" />
                  <p className="text-white/45 text-xs leading-relaxed">
                    Estimado basado en precios de mercado de La Araucanía (junio 2026).
                    El costo real puede variar según condiciones del terreno, acceso y
                    disponibilidad de materiales. Solicita una cotización formal para un
                    valor preciso.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const resumen = items.map((item) =>
                      `• ${item.label} — ${item.dimLabel} · ${
                        item.calidad === "basico" ? "Básico" :
                        item.calidad === "estandar" ? "Estándar" : "Premium"
                      }: ${formatCLP(item.rango.min)} – ${formatCLP(item.rango.max)}\n  ${item.spec}`
                    ).join("\n");
                    const texto = `Cotización Express:\n${resumen}\n\nTotal estimado: ${formatCLP(totalMin)} – ${formatCLP(totalMax)}`;
                    window.dispatchEvent(new CustomEvent("cv:cotizacion", { detail: { texto } }));
                    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 flex items-center justify-center gap-2 w-full bg-white text-navy font-bold py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
                  Solicitar cotización formal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
