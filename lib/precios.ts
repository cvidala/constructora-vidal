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
  specs: Record<Calidad, string>;   // descripción técnica por nivel
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
    specs: {
      basico:   "Plancha 10mm sobre estructura madera, terminación sin pintar",
      estandar: "Plancha 12mm sobre estructura metálica, listo para pintar",
      premium:  "Plancha 15mm con aislación acústica 50mm, terminación fina",
    },
  },
  cielo_madera: {
    label: "Cielo Madera / Machihembrado",
    categoria: "Cielos",
    unidad: "m²",
    input: "area",
    precios: { basico: 22_000, estandar: 35_000, premium: 55_000 },
    specs: {
      basico:   "Machihembrado pino sin tratar, sobre estructura madera",
      estandar: "Machihembrado pino barnizado, estructura metálica",
      premium:  "Madera nativa o MDF lacado, instalación con nivelación precisa",
    },
  },
  piso_flotante: {
    label: "Piso Flotante / Laminado",
    categoria: "Pisos",
    unidad: "m²",
    input: "area",
    precios: { basico: 18_000, estandar: 32_000, premium: 58_000 },
    specs: {
      basico:   "Laminado 7mm clase AC3, sin espuma base incluida",
      estandar: "Laminado 8mm clase AC4 con espuma base, resistente a humedad",
      premium:  "Piso flotante 12mm clase AC5 o vinílico SPC, antihumedad total",
    },
  },
  piso_ceramico: {
    label: "Piso Cerámico / Porcelanato",
    categoria: "Pisos",
    unidad: "m²",
    input: "area",
    precios: { basico: 22_000, estandar: 38_000, premium: 68_000 },
    specs: {
      basico:   "Cerámica nacional 30×30cm, instalación con adhesivo, sin fragüe especial",
      estandar: "Porcelanato 60×60cm importado, fragüe de color, nivelación",
      premium:  "Porcelanato gran formato +80×80cm, adhesivo flexible, juntas milimetradas",
    },
  },
  piso_hormigon: {
    label: "Piso Hormigón Pulido",
    categoria: "Pisos",
    unidad: "m²",
    input: "area",
    precios: { basico: 25_000, estandar: 40_000, premium: 65_000 },
    specs: {
      basico:   "Radier H-15 de 8cm, terminación escobillada, sin pulir",
      estandar: "Radier H-20 de 10cm con endurecedor, pulido mecánico básico",
      premium:  "Hormigón pulido con diamante, sellador epóxico, acabado espejo",
    },
  },
  pintura_interior: {
    label: "Pintura Interior",
    categoria: "Terminaciones",
    unidad: "m²",
    input: "area",
    precios: { basico: 8_000, estandar: 12_000, premium: 19_000 },
    specs: {
      basico:   "Pintura látex económica, 1 mano de sellador + 1 mano de color",
      estandar: "Pintura lavable, 1 mano sellador + 2 manos de color",
      premium:  "Pintura premium lavable, corrección de imperfecciones + 2 manos",
    },
  },
  pintura_exterior: {
    label: "Pintura Exterior",
    categoria: "Terminaciones",
    unidad: "m²",
    input: "area",
    precios: { basico: 10_000, estandar: 16_000, premium: 26_000 },
    specs: {
      basico:   "Pintura exterior económica, 1 mano sellador + 1 mano color",
      estandar: "Pintura impermeabilizante, 1 mano sellador + 2 manos color",
      premium:  "Pintura elastomérica anti-humedad, 3 manos, incluye preparación",
    },
  },
  tabique_volcanita: {
    label: "Tabique Volcanita",
    categoria: "Muros y Tabiques",
    unidad: "m²",
    input: "longxalto",
    precios: { basico: 28_000, estandar: 42_000, premium: 65_000 },
    specs: {
      basico:   "Estructura madera 2×3, 1 placa 10mm por cara, sin aislación",
      estandar: "Estructura metálica 2×4, 1 placa 12mm por cara, sin aislación",
      premium:  "Estructura metálica 2×4, doble placa 12mm + lana mineral 50mm",
    },
  },
  tabique_madera: {
    label: "Tabique Madera",
    categoria: "Muros y Tabiques",
    unidad: "m²",
    input: "longxalto",
    precios: { basico: 22_000, estandar: 35_000, premium: 55_000 },
    specs: {
      basico:   "Entablado pino sin cepillar sobre estructura 2×3",
      estandar: "Entablado pino cepillado barnizado sobre estructura 2×4",
      premium:  "Madera cepillada o machihembrado con aislación interior 50mm",
    },
  },
  muro_albanileria: {
    label: "Muro de Albañilería (ladrillo/bloque)",
    categoria: "Muros y Tabiques",
    unidad: "m²",
    input: "longxalto",
    precios: { basico: 55_000, estandar: 80_000, premium: 120_000 },
    specs: {
      basico:   "Bloque hormigón 15cm, mortero cemento-arena, sin revestimiento",
      estandar: "Ladrillo cerámico o bloque 20cm, mortero, estuco interior",
      premium:  "Ladrillo o bloque 20cm + aislación exterior + revestimiento fino",
    },
  },
  techo_zinc: {
    label: "Techo Zinc / Metalcon",
    categoria: "Techumbres",
    unidad: "m²",
    input: "area",
    precios: { basico: 35_000, estandar: 55_000, premium: 82_000 },
    specs: {
      basico:   "Cubierta zinc cincada, pendiente simple, estructura madera",
      estandar: "Cubierta zinc aluminizado, estructura metalcon, con alero",
      premium:  "Cubierta zinc prepintado + aislación termoacústica 50mm",
    },
  },
  techo_teja: {
    label: "Techo Teja Fibrocemento",
    categoria: "Techumbres",
    unidad: "m²",
    input: "area",
    precios: { basico: 45_000, estandar: 70_000, premium: 105_000 },
    specs: {
      basico:   "Teja de fibrocemento sobre estructura madera, sin cielo",
      estandar: "Teja fibrocemento coloreada, estructura madera, con alero",
      premium:  "Teja fibrocemento + manta aislante 80mm + cielo terminado",
    },
  },
  techo_asfaltico: {
    label: "Techo Losa / Impermeabilización",
    categoria: "Techumbres",
    unidad: "m²",
    input: "area",
    precios: { basico: 40_000, estandar: 62_000, premium: 95_000 },
    specs: {
      basico:   "Membrana asfáltica autoadhesiva 3mm, 1 capa",
      estandar: "Membrana asfáltica 4mm con aluminio, 2 capas, incluye imprimante",
      premium:  "Sistema multicapa + membrana líquida + protección UV garantía 10 años",
    },
  },
  ventana_aluminio: {
    label: "Ventana Aluminio",
    categoria: "Ventanas y Puertas",
    unidad: "m²",
    input: "longxalto",
    precios: { basico: 60_000, estandar: 95_000, premium: 150_000 },
    specs: {
      basico:   "Perfil de aluminio serie 20, vidrio simple 4mm, corredera",
      estandar: "Perfil aluminio serie 25 termopanel 4-9-4mm, corredera o abatible",
      premium:  "Perfil aluminio RPT (rotura puente térmico), DVH 4-12-4mm, alta hermeticidad",
    },
  },
  puerta_interior: {
    label: "Puerta Interior",
    categoria: "Ventanas y Puertas",
    unidad: "un",
    input: "unidad",
    precios: { basico: 80_000, estandar: 130_000, premium: 210_000 },
    specs: {
      basico:   "Puerta HDF 90×200cm, con marco y chapa básica, sin pintar",
      estandar: "Puerta MDF lacada 90×200cm, marco, chapa ciega y dinteles",
      premium:  "Puerta madera maciza o MDF enchapada, herraje premium, instalación incluida",
    },
  },
  puerta_exterior: {
    label: "Puerta Exterior",
    categoria: "Ventanas y Puertas",
    unidad: "un",
    input: "unidad",
    precios: { basico: 150_000, estandar: 230_000, premium: 380_000 },
    specs: {
      basico:   "Puerta metálica o HDF reforzada, cerradura básica, sin pintar",
      estandar: "Puerta metálica o madera 90×210cm, cerradura doble punto, con marco",
      premium:  "Puerta seguridad blindada o madera maciza, cerradura multipunto, sellado perimetral",
    },
  },
  banio_completo: {
    label: "Baño Completo",
    categoria: "Espacios Completos",
    unidad: "un",
    input: "unidad",
    precios: { basico: 900_000, estandar: 1_600_000, premium: 3_000_000 },
    specs: {
      basico:   "WC, lavamanos y ducha, cerámica básica, grifería nacional económica",
      estandar: "WC, lavamanos, tina o ducha vidrio, porcelanato, grifería monocomando",
      premium:  "Baño completo con tina, ducha independiente, revestimiento gres o mármol, grifería importada",
    },
  },
  cocina_equipada: {
    label: "Cocina con Muebles y Mesón",
    categoria: "Espacios Completos",
    unidad: "un",
    input: "unidad",
    precios: { basico: 1_200_000, estandar: 2_500_000, premium: 5_500_000 },
    specs: {
      basico:   "Muebles melamina, mesón postformado, sin electrodomésticos",
      estandar: "Muebles MDF lacado, mesón cuarzo o granito, incluye campana",
      premium:  "Muebles lacados a medida, mesón cuarzo Silestone, cajones suaves, manilla integrada",
    },
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
