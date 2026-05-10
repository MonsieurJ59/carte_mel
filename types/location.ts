export interface Location {
  id: number
  name: string
  description: string
  address: string
  latitude: number
  longitude: number
  image?: string
  link?: string
  category: "TSA" | "Polyhandicap" | "Les Deux"
  phone?: string
  publicType?: string
  admissionType?: string
  territory: "MEL" | "HORS-MEL"
  department: "Nord" | "Pas-de-Calais"
}
