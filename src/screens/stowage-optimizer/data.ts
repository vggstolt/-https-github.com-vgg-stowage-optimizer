export type Cargo = {
  id: string
  number: string
  name: string
  nominalQty: string
  terms: string
  pending?: boolean
}

export const voyage = {
  vessel: 'BOCHEM NEW ORLEANS',
  voyageNumber: '10 (C25)',
  route: 'HBR-ASIA/SAF-USA',
}

export const optimizationStatus = {
  state: 'Finished',
  message: 'Result received and processed',
  started: '11 Jul 2025 14:43:15',
  startedBy: 'KPL',
  lastUpdate: '11 Jul 2025 14:43:23',
  trackingId: 'a48bdb56-f80f-4a75-b377-071b4fa4f541',
  optimalityGap: '7%',
  runtime: '4 mins',
}

export const optimizerOptions = [
  { key: 'allCargoStowed', label: 'All cargo must be stowed', hint: 'The optimizer must find a tank for every cargo in the booking list.' },
  { key: 'expectMoreCargo', label: 'Expect more cargo', hint: 'Keep spare capacity for cargoes that have not been fixed yet.' },
  { key: 'minimizeChanges', label: 'Minimize changes for stowed cargos', hint: 'Prefer to keep already stowed cargoes in their current tanks.' },
  { key: 'clustering', label: 'Clustering', hint: 'Group tanks carrying the same cargo next to each other.' },
  { key: 'improveHistory', label: 'Improve last cargo history future voyages', hint: 'Favour tank assignments that simplify cleaning for upcoming voyages.' },
  { key: 'purging', label: 'Purging / Avoid sweating', hint: 'Avoid tanks where condensation or purging requirements apply.' },
] as const

export type OptimizerOptionKey = (typeof optimizerOptions)[number]['key']

export const cargoes: Cargo[] = [
  { id: '655', number: '655 (cc)', name: 'Sulfuric acid 99%', nominalQty: '12687 MT', terms: 'MNMXC' },
  { id: '660', number: '660', name: 'P&G FALCOHOL CO-1214', nominalQty: '12687 MT', terms: '10% MOLCO' },
  { id: '670', number: '670 (cc)', name: '2-ETHYLHEXYL ACRYLATE', nominalQty: '12687 MT', terms: '5% MOLCO' },
  { id: '680', number: '680 (cc)', name: '2-ETHYLHEXYL ACRYLATE', nominalQty: '12687 MT', terms: '2% MOLOO', pending: true },
  { id: '900', number: '900', name: 'a/o 14/16/18 + bht', nominalQty: '8400 MT', terms: '5% MOLCO', pending: true },
  { id: '910', number: '910 (cc)', name: 'Methanol', nominalQty: '6200 MT', terms: 'MNMXC' },
  { id: '920', number: '920', name: 'Styrene monomer', nominalQty: '4100 MT', terms: '10% MOLCO' },
  { id: '930', number: '930 (cc)', name: 'Acetic acid', nominalQty: '3900 MT', terms: '5% MOLCO' },
  { id: '940', number: '940', name: 'Glycerine 99.7%', nominalQty: '2600 MT', terms: 'MNMXC' },
  { id: '950', number: '950 (cc)', name: 'Phenol', nominalQty: '2100 MT', terms: '5% MOLCO', pending: true },
]

export type TankSide = 'P' | 'S'
export type SgBand = 'below30' | '30to39' | '40to49' | '50to59' | '60plus'

export type Tank = {
  id: string
  /** Position label shown top right, e.g. "1333 | 1S" (capacity | tank id). */
  capacity: number
  cargo: string
  temperature: string
  fill: string
  sgBand: SgBand
  quantity: number
  coating: string
  selected?: boolean
  pinned?: boolean
  avoid?: boolean
}

const bands: SgBand[] = ['below30', 'below30', '30to39', '30to39', 'below30']

function makeTank(id: string, i: number, overrides: Partial<Tank> = {}): Tank {
  return {
    id,
    capacity: 1333,
    cargo: '101 PROPANOL (EU-1)',
    temperature: '(XX°C) XX%',
    fill: 'XX%',
    sgBand: bands[i % bands.length],
    quantity: 255,
    coating: 'mc',
    ...overrides,
  }
}

/**
 * Centre tank block: 13 rows × 3 columns (port, centre, starboard). The vessel
 * centreline is drawn between the second and third column.
 */
export const centreTanks: Tank[][] = Array.from({ length: 13 }, (_, row) => {
  const n = row + 1
  return [
    makeTank(`${n}P`, row, { pinned: n === 1 || n === 3 }),
    makeTank(`${n}C`, row + 1, { selected: n === 4, avoid: n === 5 }),
    makeTank(`${n}S`, row + 2, { avoid: n === 4 || n === 3, pinned: n === 1 }),
  ]
})

/** Wing / deck tanks rendered taller, three per side. */
export const portWingTanks: Tank[] = ['1WP', '2WP', '3WP'].map((id, i) => makeTank(id, i))
export const starboardWingTanks: Tank[] = ['1WS', '2WS', '3WS'].map((id, i) => makeTank(id, i + 1))

export const weightSummary = {
  listing: 154,
  port: 10700,
  centre: 500,
  starboard: 10854,
}

export const sgLegend: { band: SgBand; label: string; className: string }[] = [
  { band: 'below30', label: 'Below 30°C', className: 'text-p1' },
  { band: '30to39', label: '30°C - 39°C', className: 'text-success' },
  { band: '40to49', label: '40°C - 49°C', className: 'text-warning' },
  { band: '50to59', label: '50°C - 59°C', className: 'text-danger' },
  { band: '60plus', label: '60°C and above', className: 'text-f1' },
]

export const sgBandClass: Record<SgBand, string> = Object.fromEntries(sgLegend.map((l) => [l.band, l.className])) as Record<
  SgBand,
  string
>
