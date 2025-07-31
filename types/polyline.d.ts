// types/polyline.d.ts
declare module '@mapbox/polyline' {
  export function decode(str: string): [number, number][];
  export function encode(coords: [number, number][]): string;
}
