"use client"

import dynamic from "next/dynamic"
import locationsData from "@/data/locations.json"
import type { Location } from "@/types/location"

// Dynamic import to disable SSR for the map component
const InteractiveMap = dynamic(() => import("@/components/interactive-map").then((mod) => ({ default: mod.InteractiveMap })), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-muted">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="text-sm text-muted-foreground">Chargement...</span>
      </div>
    </div>
  ),
})

// Validate and parse locations data
function getLocations(): Location[] {
  try {
    if (!Array.isArray(locationsData)) {
      console.error("Invalid locations data: expected an array")
      return []
    }

    return locationsData.filter((loc): loc is Location => {
      return (
        typeof loc === "object" &&
        loc !== null &&
        typeof loc.id === "number" &&
        typeof loc.name === "string" &&
        typeof loc.latitude === "number" &&
        typeof loc.longitude === "number"
      )
    })
  } catch (error) {
    console.error("Error parsing locations:", error)
    return []
  }
}

export default function HomePage() {
  const locations = getLocations()

  return (
    <main className="h-screen w-full overflow-hidden">
      <InteractiveMap locations={locations} />
    </main>
  )
}
