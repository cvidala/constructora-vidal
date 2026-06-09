// Precios de referencia de mercado — La Araucanía, Chile
// Última revisión: junio 2026
// Actualizar mensualmente con los valores vigentes del mercado regional.

export type Calidad = "basico" | "estandar" | "premium";

export type TipoInput = "area" | "longxalto" | "unidad";

export type Partida = {
  label: string;
  categoria: string;
  unidad: string;
  input: TipoInput;
  precios: Record<Calidad, number>; // CLP por unidad
};

// Margen de variación aplicado al rango (±%)
export const MARGEN_VARIACION = 0.20;

export const PARTIDAS: Record<string, Partida> = {
  cielo_volcanita: {
    label: "Cielo Volcanita",
    categoria: "Cielos",
    unidad: "m²",
    input: "area",
    precios: { basico: 18_000, estandar: 28_000, premium: 45_000 },
  },
  cielo_madera: {
    label: "Cielo Madera / Machihembrado",
    categoria: "Cielos",
    unidad: "m²",
    input: "area",
    precios: { basico: 22_000, estandar: 35_000, premium: 55_000 },
  },
  piso_flotante: {
    label: "Piso Flotante / Laminado",
    categoria: "Pisos",
    unidad: "m²",
    input: "area",
    precios: { basico: 18_000, estandar: 32_000, premium: 58_000 },
  },
  piso_ceramico: {
    label: "Piso Cerámico / Porcelanato",
    categoria: "Pisos",
    unidad: "m²",
    input: "area",
    precios: { basico: 22_000, estandar: 38_000, premium: 68_000 },
  },
  piso_hormigon: {
    label: "Piso Hormigón Pulido",
    categoria: "Pisos",
    unidad: "m²",
    input: "area",
    precios: { basico: 25_000, estandar: 40_000, premium: 65_000 },
  },
  pintura_interior: {
    label: "Pintura Interior",
    categoria: "Terminaciones",
    unidad: "m²",
    input: "area",
    precios: { basico: 8_000, estandar: 12_000, premium: 19_000 },
  },
  pintura_exterior: {
    label: "Pintura Exterior",
    categoria: "Terminaciones",
    unidad: "m²",
    input: "area",
    precios: { basico: 10_000, estandar: 16_000, premium: 26_000 },
  },
  tabique_volcanita: {
    label: "Tabique Volcanita",
    categoria: "Muros y Tabiques",
    unidad: "m²",
    input: "longxalto",
    precios: { basico: 28_000, estandar: 42_000, premium: 65_000 },
  },
  tabique_madera: {
    label: "Tabique Madera",
    categoria: "Muros y Tabiques",
    unidad: "m²",
    input: "longxalto",
    precios: { basico: 22_000, estandar: 35_000, premium: 55_000 },
  },
  muro_albañileria: {
    label: "Muro de Albañilería (ladrillo/bloque)",
    categoria: "Muros y Tabiques",
    unidad: "m²",
    input: "longxalto",
    precios: { basico: 55_000, estandar: 80_000, premium: 120_000 },
  },
  techo_zinc: {
    label: "Techo Zinc / Metalcon",
    categoria: "Techumbres",
    unidad: "m²",
    input: "area",
    precios: { basico: 35_000, estandar: 55_000, premium: 82_000 },
  },
  techo_teja: {
    label: "Techo Teja Fibrocemento",
    categoria: "Techumbres",
    unidad: "m²",
    input: "area",
    precios: { basico: 45_000, estandar: 70_000, premium: 105_000 },
  },
  techo_asfaltico: {
    label: "Techo Losa / Impermeabilización",
    categoria: "Techumbres",
    unidad: "m²",
    input: "area",
    precios: { basico: 40_000, estandar: 62_000, premium: 95_000 },
  },
  ventana_aluminio: {
    label: "Ventana Aluminio",
    categoria: "Ventanas y Puertas",
    unidad: "m²",
    input: "longxalto",
    precios: { basico: 60_000, estandar: 95_000, premium: 150_000 },
  },
  puerta_interior: {
    label: "Puerta Interior",
    categoria: "Ventanas y Puertas",
    unidad: "un",
    input: "unidad",
    precios: { basico: 80_000, estandar: 130_000, premium: 210_000 },
  },
  puerta_exterior: {
    label: "Puerta Exterior",
    categoria: "Ventanas y Puertas",
    unidad: "un",
    input: "unidad",
    precios: { basico: 150_000, estandar: 230_000, premium: 380_000 },
  },
  banio_completo: {
    label: "Baño Completo (terminaciones + sanitario)",
    categoria: "Espacios Completos",
    unidad: "un",
    input: "unidad",
    precios: { basico: 900_000, estandar: 1_600_000, premium: 3_000_000 },
  },
  cocina_equipada: {
    label: "Cocina con Muebles y Mesón",
    categoria: "Espacios Completos",
    unidad: "un",
    input: "unidad",
    precios: { basico: 1_200_000, estandar: 2_500_000, premium: 5_500_000 },
  },
};

// Categorías únicas para agrupar el selector
export const CATEGORIAS = Array.from(
  new Set(Object.values(PARTIDAS).map((p) => p.categoria))
);

export function calcularRango(
  partidaKey: string,
  calidad: Calidad,
  cantidad: number
): { min: number; max: number } {
  const partida = PARTIDAS[partidaKey];
  if (!partida) return { min: 0, max: 0 };
  const base = partida.precios[calidad] * cantidad;
  return {
    min: Math.round(base * (1 - MARGEN_VARIACION)),
    max: Math.round(base * (1 + MARGEN_VARIACION)),
  };
}

export function formatCLP(valor: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);
}
