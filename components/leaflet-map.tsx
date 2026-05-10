"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Location } from "@/types/location"
import { MarkerPopup } from "./marker-popup"
import boundariesData from "@/data/boundaries.json"

// Custom marker icons for different categories
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  })
}

const icons = {
  TSA: createCustomIcon("#ef4444"), // Red
  Polyhandicap: createCustomIcon("#3b82f6"), // Blue
  "Les Deux": createCustomIcon("#9333ea"), // Purple
}

// Component to handle flying to a location
function FlyToLocation({ location }: { location: Location | null }) {
  const map = useMap()

  useEffect(() => {
    if (location) {
      map.flyTo([location.latitude, location.longitude], 15, {
        duration: 1,
      })
    }
  }, [location, map])

  return null
}

interface LeafletMapProps {
  locations: Location[]
  selectedLocation: Location | null
  onMarkerClick: (location: Location) => void
}

export function LeafletMap({ locations, selectedLocation, onMarkerClick }: LeafletMapProps) {
  const [mounted, setMounted] = useState(false)

  // Region center coordinates (NPDC)
  const regionCenter: [number, number] = [50.48, 2.9]
  const defaultZoom = 9

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Chargement de la carte...</span>
        </div>
      </div>
    )
  }

  const getBoundaryStyle = (feature: any) => {
    if (feature.id === "mel") {
      return {
        color: "#000",
        weight: 2,
        dashArray: "5, 5",
        fillOpacity: 0,
      }
    }
    return {
      fillColor: feature.properties.fill,
      weight: 2,
      opacity: 1,
      color: feature.properties.stroke,
      fillOpacity: 0.1,
    }
  }

  return (
    <MapContainer
      center={regionCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON 
        data={boundariesData as any} 
        style={getBoundaryStyle}
      />

      <FlyToLocation location={selectedLocation} />

      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={icons[location.category as keyof typeof icons] || icons.TSA}
          eventHandlers={{
            click: () => onMarkerClick(location),
          }}
        >
          <Popup maxWidth={320} minWidth={280}>
            <MarkerPopup location={location} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
