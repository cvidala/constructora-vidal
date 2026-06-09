"use client";

import { useState } from "react";
import { Calculator, Package, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ---- Cubicación ----

function CubicacionCalc() {
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");

  const l = parseFloat(largo) || 0;
  const a = parseFloat(ancho) || 0;
  const h = parseFloat(alto) || 0;

  const area = l * a;
  const volumen = area * h;
  const perimetro = 2 * (l + a);
  const hasResult = l > 0 && a > 0;

  const reset = () => { setLargo(""); setAncho(""); setAlto(""); };

  return (
    <div className="space-y-6">
      <p className="text-gray-500 text-sm">
        Ingresa las dimensiones del espacio. La altura es opcional (para calcular volumen).
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="largo">Largo (m)</Label>
          <Input
            id="largo"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={largo}
            onChange={(e) => setLargo(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ancho">Ancho (m)</Label>
          <Input
            id="ancho"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={ancho}
            onChange={(e) => setAncho(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="alto">Altura (m)</Label>
          <Input
            id="alto"
            type="number"
            min="0"
            step="0.01"
            placeholder="Opcional"
            value={alto}
            onChange={(e) => setAlto(e.target.value)}
          />
        </div>
      </div>

      {hasResult && (
        <div className="bg-navy/5 border border-navy/10 rounded-xl p-6 space-y-4">
          <h4 className="font-semibold text-navy text-sm uppercase tracking-wide">
            Resultados
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <ResultCard label="Área" value={`${area.toFixed(2)} m²`} highlight />
            <ResultCard label="Perímetro" value={`${perimetro.toFixed(2)} m`} />
            {h > 0 && (
              <ResultCard label="Volumen" value={`${volumen.toFixed(2)} m³`} highlight />
            )}
          </div>
        </div>
      )}

      <button
        onClick={reset}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Limpiar
      </button>
    </div>
  );
}

// ---- Materiales ----

type Material = {
  label: string;
  unidad: string;
  calcular: (area: number, extra?: number) => { resultado: number; descripcion: string }[];
  extraLabel?: string;
  extraPlaceholder?: string;
  extraDefault?: string;
};

const materiales: Record<string, Material> = {
  ceramica: {
    label: "Cerámica / Baldosas",
    unidad: "m² a instalar",
    extraLabel: "Lado de la pieza (cm)",
    extraPlaceholder: "ej: 60",
    extraDefault: "60",
    calcular: (area, tamano = 60) => {
      const conDesperdicio = area * 1.10;
      const piezaM2 = (tamano / 100) * (tamano / 100);
      const piezas = Math.ceil(conDesperdicio / piezaM2);
      return [
        { resultado: conDesperdicio, descripcion: `m² a comprar (incl. 10% desperdicio)` },
        { resultado: piezas, descripcion: `piezas de ${tamano}×${tamano} cm aprox.` },
      ];
    },
  },
  piso_flotante: {
    label: "Piso Flotante / Laminado",
    unidad: "m² a cubrir",
    calcular: (area) => {
      const conDesperdicio = area * 1.07;
      return [
        { resultado: conDesperdicio, descripcion: "m² a comprar (incl. 7% desperdicio)" },
      ];
    },
  },
  pintura: {
    label: "Pintura de Muro",
    unidad: "m² de superficie",
    extraLabel: "N° de manos",
    extraPlaceholder: "2",
    extraDefault: "2",
    calcular: (area, manos = 2) => {
      const litros = (area * manos) / 11;
      return [
        { resultado: litros, descripcion: `litros necesarios (${manos} mano${manos > 1 ? "s" : ""}, rendim. 11 m²/L)` },
      ];
    },
  },
  mortero: {
    label: "Mortero / Adhesivo",
    unidad: "m² a cubrir",
    calcular: (area) => {
      const kg = area * 4.5;
      const sacos = Math.ceil(kg / 25);
      return [
        { resultado: kg, descripcion: "kg de mortero necesarios" },
        { resultado: sacos, descripcion: "sacos de 25 kg" },
      ];
    },
  },
  arena: {
    label: "Arena / Áridos (relleno)",
    unidad: "m² de superficie",
    extraLabel: "Espesor de relleno (cm)",
    extraPlaceholder: "10",
    extraDefault: "10",
    calcular: (area, espesor = 10) => {
      const m3 = area * (espesor / 100);
      return [
        { resultado: m3, descripcion: `m³ de árido (${espesor} cm de espesor)` },
      ];
    },
  },
};

function MaterialesCalc() {
  const [tipo, setTipo] = useState<keyof typeof materiales>("ceramica");
  const [area, setArea] = useState("");
  const [extra, setExtra] = useState(materiales.ceramica.extraDefault ?? "");

  const mat = materiales[tipo];
  const a = parseFloat(area) || 0;
  const e = parseFloat(extra) || parseFloat(mat.extraDefault ?? "0");
  const resultados = a > 0 ? mat.calcular(a, e) : [];

  const handleTipo = (t: keyof typeof materiales) => {
    setTipo(t);
    setArea("");
    setExtra(materiales[t].extraDefault ?? "");
  };

  const reset = () => { setArea(""); setExtra(mat.extraDefault ?? ""); };

  return (
    <div className="space-y-6">
      <p className="text-gray-500 text-sm">
        Selecciona el material e ingresa el área a trabajar para calcular la
        cantidad necesaria.
      </p>

      {/* Material selector */}
      <div className="space-y-1.5">
        <Label htmlFor="material">Tipo de material</Label>
        <select
          id="material"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
          value={tipo}
          onChange={(e) => handleTipo(e.target.value as keyof typeof materiales)}
        >
          {Object.entries(materiales).map(([k, m]) => (
            <option key={k} value={k}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="area-mat">{mat.unidad}</Label>
          <Input
            id="area-mat"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        {mat.extraLabel && (
          <div className="space-y-1.5">
            <Label htmlFor="extra">{mat.extraLabel}</Label>
            <Input
              id="extra"
              type="number"
              min="0"
              step="1"
              placeholder={mat.extraPlaceholder}
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
            />
          </div>
        )}
      </div>

      {resultados.length > 0 && (
        <div className="bg-navy/5 border border-navy/10 rounded-xl p-6 space-y-4">
          <h4 className="font-semibold text-navy text-sm uppercase tracking-wide">
            Resultados para {mat.label}
          </h4>
          <div className={`grid gap-4 ${resultados.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-xs"}`}>
            {resultados.map((r, i) => (
              <ResultCard
                key={i}
                label={r.descripcion}
                value={Number.isInteger(r.resultado)
                  ? r.resultado.toString()
                  : r.resultado.toFixed(2)}
                highlight={i === 0}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={reset}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Limpiar
      </button>
    </div>
  );
}

// ---- Shared result card ----

function ResultCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-4 ${
        highlight
          ? "bg-gold/10 border border-gold/25"
          : "bg-white border border-gray-100"
      }`}
    >
      <div
        className={`text-2xl font-extrabold font-heading ${
          highlight ? "text-gold-hover" : "text-navy"
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-gray-500 mt-1 leading-tight">{label}</div>
    </div>
  );
}

// ---- Main section ----

type Tab = "cubicacion" | "materiales";

export default function Herramientas() {
  const [tab, setTab] = useState<Tab>("cubicacion");

  return (
    <section id="herramientas" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Gratis y sin registro
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy font-heading leading-tight">
            Herramientas de Cálculo
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Calculadoras simples para estimar materiales y medidas antes de
            iniciar tu obra o remodelación.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl mb-8">
          <TabButton
            active={tab === "cubicacion"}
            onClick={() => setTab("cubicacion")}
            icon={<Calculator className="h-4 w-4" />}
            label="Cubicación"
          />
          <TabButton
            active={tab === "materiales"}
            onClick={() => setTab("materiales")}
            icon={<Package className="h-4 w-4" />}
            label="Materiales"
          />
        </div>

        {/* Calculator panel */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
          {tab === "cubicacion" ? <CubicacionCalc /> : <MaterialesCalc />}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          Los resultados son estimativos. Consulta siempre con un profesional
          para proyectos de construcción.
        </p>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
        active
          ? "bg-white text-navy shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
