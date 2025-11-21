// types/property.ts

export interface AreaDivision {
  area: string;
  title: string;
}

export interface Plan {
  image: string;
  title: string;
}

export interface Structure {
  brands: string[];
  materials: string;
}

export interface Tile {
  title: string;
  brands: string[];
  measurement: string[];
}

export interface Door {
  area: string [];
  title: string;
  material: string[];
  measurement: string[];
}

export interface Window {
  area: string [];
  measurement: string [];
  type: string;
  material: string[];
}

export interface ElectricalRoom {
  name?: string;
  area?: string;
  points: Record<string, number>;
}

export interface Electrical {
  brands?: string[];
  rooms?: ElectricalRoom[];
  area?: string;
  points?: Record<string, number>;
}

export interface Plumbing {
  brands?: string[];
  materials?: string;
  area?: string;
  points?: Record<string, number>;
}

export interface Paint {
  brands: string[];
  workType: string;
}

export interface Elevation {
  id: string;
  slug: string;
  title: string;
  images: string[];
  bhk: string;
  floors: string;
  area: string;
  description: string;
  is_lift?: boolean;
  lift?: string;
  areadivision: AreaDivision[];
  plans: Plan[];
  structure: Structure[];
  tiles: Tile[];
  doors: Door[];
  windows: Window[];
  electrical: Electrical[];
  plumbing: Plumbing[];
  paint: Paint[];
}

export interface Property {
  id: string;
  title: string;
  city: string;
  state: string | null;
  country: string | null;
  price: string;
  landmark: string | null;
  totalDays: string | null;
  projectName?: string;
  type?: string;
  status: boolean;
  elevation: Elevation;
}

// Additional utility types
export interface PropertyCalculations {
  pricePerSqFt: number;
  totalElectricalPoints: number;
  estimatedCompletion: string | null;
}