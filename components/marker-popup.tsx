"use client"

import { ExternalLink, MapPin, Phone, Users, Home } from "lucide-react"
import type { Location } from "@/types/location"
import { Button } from "@/components/ui/button"

interface MarkerPopupProps {
  location: Location
}

export function MarkerPopup({ location }: MarkerPopupProps) {
  return (
    <div className="min-w-[250px] max-w-[300px] py-1">
      <div className="mb-2 flex flex-col gap-1.5">
        <h3 className="text-base font-bold text-foreground leading-tight">{location.name}</h3>
        <div className="flex flex-wrap gap-1.5">
          {location.territory && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-primary/30 text-primary bg-primary/5">
              {location.territory === "MEL" ? "MEL" : "HORS MEL"}
            </span>
          )}
          {location.category && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${
              location.category === "TSA" ? "bg-red-500" : 
              location.category === "Polyhandicap" ? "bg-blue-500" : 
              "bg-purple-600"
            }`}>
              {location.category}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
          <span className="font-medium">{location.address}</span>
        </div>

        {location.phone && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
            <a href={`tel:${location.phone}`} className="hover:text-primary transition-colors font-medium">
              {location.phone}
            </a>
          </div>
        )}

        {location.publicType && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Users className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
            <div>
              <span className="font-semibold block text-[10px] uppercase text-muted-foreground/70">Public</span>
              <span className="font-medium">{location.publicType}</span>
            </div>
          </div>
        )}

        {location.admissionType && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Home className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
            <div>
              <span className="font-semibold block text-[10px] uppercase text-muted-foreground/70">Accueil</span>
              <span className="font-medium">{location.admissionType}</span>
            </div>
          </div>
        )}
      </div>

      {location.link && (
        <Button asChild size="sm" className="mt-4 w-full h-8 text-xs">
          <a href={location.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            En savoir plus
          </a>
        </Button>
      )}
    </div>
  )
}
