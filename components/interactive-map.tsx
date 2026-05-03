"use client"

import { useState, useMemo, Suspense, lazy } from "react"
import { MapPin, List, Map as MapIcon, AlertCircle } from "lucide-react"
import type { Location } from "@/types/location"
import { LocationCard } from "./location-card"
import { CategoryFilter } from "./category-filter"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Lazy load the map component to avoid SSR issues
const LeafletMap = lazy(() =>
  import("./leaflet-map").then((mod) => ({ default: mod.LeafletMap }))
)

interface InteractiveMapProps {
  locations: Location[]
}

export function InteractiveMap({ locations }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showList, setShowList] = useState(false)

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = locations
      .map((loc) => loc.category)
      .filter((cat): cat is string => Boolean(cat))
    return [...new Set(cats)]
  }, [locations])

  // Filter locations by category
  const filteredLocations = useMemo(() => {
    if (!selectedCategory) return locations
    return locations.filter((loc) => loc.category === selectedCategory)
  }, [locations, selectedCategory])

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location)
  }

  const handleCardClick = (location: Location) => {
    setSelectedLocation(location)
    setShowList(false)
  }

  if (locations.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="font-semibold">Aucun lieu trouvé</h3>
            <p className="text-sm text-muted-foreground">
              Le fichier de données est vide ou mal formaté.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="border-b bg-background px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Métropole Européenne de Lille</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredLocations.length} lieu{filteredLocations.length > 1 ? "x" : ""}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowList(!showList)}
            >
              {showList ? (
                <>
                  <MapIcon className="mr-1.5 h-4 w-4" />
                  Carte
                </>
              ) : (
                <>
                  <List className="mr-1.5 h-4 w-4" />
                  Liste
                </>
              )}
            </Button>
          </div>
        </div>
        {categories.length > 0 && (
          <div className="mt-3">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile unless showList is true */}
        <aside
          className={cn(
            "absolute inset-0 z-10 overflow-y-auto bg-background p-4 transition-transform md:relative md:inset-auto md:z-auto md:w-80 md:translate-x-0 md:border-r lg:w-96",
            showList ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col gap-3">
            {filteredLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                isSelected={selectedLocation?.id === location.id}
                onClick={() => handleCardClick(location)}
              />
            ))}
          </div>
        </aside>

        {/* Map */}
        <div className="flex-1">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <span className="text-sm text-muted-foreground">Chargement de la carte...</span>
                </div>
              </div>
            }
          >
            <LeafletMap
              locations={filteredLocations}
              selectedLocation={selectedLocation}
              onMarkerClick={handleMarkerClick}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
