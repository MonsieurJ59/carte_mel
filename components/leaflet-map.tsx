"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Location } from "@/types/location"
import { MarkerPopup } from "./marker-popup"

// Fix for default marker icons in Leaflet with webpack/Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

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

  // Lille center coordinates
  const lilleCenter: [number, number] = [50.6292, 3.0573]
  const defaultZoom = 12

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

  return (
    <MapContainer
      center={lilleCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToLocation location={selectedLocation} />

      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
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
