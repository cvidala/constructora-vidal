"use client";

import { useState } from "react";
import { Plus, Trash2, Calculator, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  cantidad: number; // m² o unidades ya calculados
  label: string;
  unidad: string;
  rango: { min: number; max: number };
};

const CALIDADES: { value: Calidad; label: string; color: string }[] = [
  { value: "basico", label: "Básico", color: "bg-gray-100 text-gray-700 border-gray-200" },
  { value: "estandar", label: "Estándar", color: "bg-sky-light text-navy border-sky/30" },
  { value: "premium", label: "Premium", color: "bg-navy/5 text-navy border-navy/20" },
];

let nextId = 1;

export default function Cotizador() {
  // Form state
  const [partidaKey, setPartidaKey] = useState(Object.keys(PARTIDAS)[0]);
  const [calidad, setCalidad] = useState<Calidad>("estandar");
  const [dim1, setDim1] = useState(""); // largo o m² o unidades
  const [dim2, setDim2] = useState(""); // alto (solo para longxalto)

  // List state
  const [items, setItems] = useState<Item[]>([]);

  const partida = PARTIDAS[partidaKey];

  const getCantidad = (): number => {
    const v1 = parseFloat(dim1) || 0;
    const v2 = parseFloat(dim2) || 0;
    if (partida.input === "longxalto") return v1 * v2;
    if (partida.input === "area") return v1;
    return v1; // unidad
  };

  const cantidad = getCantidad();
  const canAdd = cantidad > 0;

  const agregar = () => {
    if (!canAdd) return;
    const rango = calcularRango(partidaKey, calidad, cantidad);
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
      },
    ]);
    setDim1("");
    setDim2("");
  };

  const eliminar = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const totalMin = items.reduce((s, i) => s + i.rango.min, 0);
  const totalMax = items.reduce((s, i) => s + i.rango.max, 0);

  const calidades = CALIDADES;

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
            Arma tu proyecto elemento por elemento y obtén un rango de costo
            estimado basado en precios de mercado de La Araucanía.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form — left */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h3 className="text-white font-semibold font-heading">
              Agregar elemento
            </h3>

            {/* Partida selector */}
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
                        <option key={k} value={k}>
                          {p.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Dimensiones */}
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs uppercase tracking-wide">
                {partida.input === "longxalto"
                  ? "Dimensiones"
                  : partida.input === "area"
                  ? "Superficie (m²)"
                  : "Cantidad (unidades)"}
              </Label>

              {partida.input === "longxalto" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Largo (m)"
                      value={dim1}
                      onChange={(e) => setDim1(e.target.value)}
                      className="w-full h-9 rounded-lg border border-white/15 bg-white/8 text-white px-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-sky"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Alto (m)"
                      value={dim2}
                      onChange={(e) => setDim2(e.target.value)}
                      className="w-full h-9 rounded-lg border border-white/15 bg-white/8 text-white px-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-sky"
                    />
                  </div>
                </div>
              ) : (
                <input
                  type="number"
                  min="0"
                  step={partida.input === "unidad" ? "1" : "0.1"}
                  placeholder={partida.input === "unidad" ? "Cantidad" : "m²"}
                  value={dim1}
                  onChange={(e) => setDim1(e.target.value)}
                  className="w-full h-9 rounded-lg border border-white/15 bg-white/8 text-white px-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-sky"
                />
              )}

              {partida.input === "longxalto" && cantidad > 0 && (
                <p className="text-sky text-xs">
                  = {cantidad.toFixed(2)} m²
                </p>
              )}
            </div>

            {/* Calidad */}
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs uppercase tracking-wide">
                Calidad de terminación
              </Label>
              <div className="grid grid-cols-3 gap-1.5">
                {calidades.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCalidad(c.value)}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                      calidad === c.value
                        ? "bg-sky text-white border-sky"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/25"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <p className="text-white/35 text-xs">
                {calidad === "basico" && "Materiales funcionales, sin lujos."}
                {calidad === "estandar" && "Materiales de buena calidad, lo más común."}
                {calidad === "premium" && "Materiales de alta gama y mano de obra especializada."}
              </p>
            </div>

            {/* Preview del ítem */}
            {canAdd && (
              <div className="bg-sky/10 border border-sky/20 rounded-lg p-3 text-sm">
                <div className="text-white/70 text-xs mb-1">Vista previa</div>
                <div className="text-white font-medium">{partida.label}</div>
                <div className="text-sky text-xs mt-1">
                  {cantidad.toFixed(partida.input === "unidad" ? 0 : 2)}{" "}
                  {partida.unidad} ·{" "}
                  {formatCLP(calcularRango(partidaKey, calidad, cantidad).min)} –{" "}
                  {formatCLP(calcularRango(partidaKey, calidad, cantidad).max)}
                </div>
              </div>
            )}

            <button
              onClick={agregar}
              disabled={!canAdd}
              className="w-full flex items-center justify-center gap-2 bg-sky hover:bg-sky-hover disabled:bg-white/10 disabled:text-white/30 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              Agregar al presupuesto
            </button>
          </div>

          {/* List + Total — right */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Items list */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1">
              <h3 className="text-white font-semibold font-heading mb-4">
                Tu presupuesto
              </h3>

              {items.length === 0 ? (
                <div className="text-center py-12 text-white/30">
                  <Calculator className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    Agrega elementos desde el formulario
                    <br />para ver el estimado.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 py-3 border-b border-white/8 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">
                          {item.label}
                        </div>
                        <div className="text-white/45 text-xs mt-0.5">
                          {item.cantidad.toFixed(item.unidad === "un" ? 0 : 2)}{" "}
                          {item.unidad} ·{" "}
                          {CALIDADES.find((c) => c.value === item.calidad)?.label}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sky text-sm font-semibold">
                          {formatCLP(item.rango.min)}
                        </div>
                        <div className="text-white/40 text-xs">
                          hasta {formatCLP(item.rango.max)}
                        </div>
                      </div>
                      <button
                        onClick={() => eliminar(item.id)}
                        className="text-white/25 hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            {items.length > 0 && (
              <div className="bg-sky/15 border border-sky/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold font-heading">
                    Total estimado
                  </span>
                  <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded-full">
                    {items.length} elemento{items.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white font-heading">
                  {formatCLP(totalMin)}
                </div>
                <div className="text-sky text-sm mt-0.5">
                  hasta {formatCLP(totalMax)}
                </div>

                <div className="mt-4 flex items-start gap-2 bg-white/5 rounded-lg p-3">
                  <AlertCircle className="h-4 w-4 text-white/40 mt-0.5 shrink-0" />
                  <p className="text-white/45 text-xs leading-relaxed">
                    Estimado basado en precios de mercado de La Araucanía. El
                    costo real puede variar según condiciones específicas del
                    terreno, acceso y materiales disponibles. Solicita una
                    cotización formal para un valor preciso.
                  </p>
                </div>

                <a
                  href="#contacto"
                  className="mt-4 flex items-center justify-center gap-2 w-full bg-white text-navy font-bold py-3 rounded-lg text-sm hover:bg-white/90 transition-colors"
                >
                  Solicitar cotización formal
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
