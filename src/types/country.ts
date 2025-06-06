export interface Country {
  name: { common: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  latlng: [number, number];
  borders?: string[];
  timezones: string[];
  currencies?: {
    [key: string]: { name: string };
  };
  languages?: { [key: string]: string };
  flags: { png: string; svg: string };
  cca3: string;
}